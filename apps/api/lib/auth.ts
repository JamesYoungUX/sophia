/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { schema as Db } from "@repo/db";
import { betterAuth } from "better-auth";
import type { DB } from "better-auth/adapters/drizzle";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { anonymous, organization } from "better-auth/plugins";
import { ALLOWED_ORIGINS } from "./cors";
import type { Env } from "./env";

/**
 * Environment variables required for authentication configuration.
 * Extracted from the main Env type for better type safety and documentation.
 */
type AuthEnv = Pick<
  Env,
  "BETTER_AUTH_SECRET" | "GOOGLE_CLIENT_ID" | "GOOGLE_CLIENT_SECRET"
>;

/**
 * Creates a Better Auth instance configured for multi-tenant SaaS with organization support.
 *
 * Key behaviors:
 * - Uses custom 'identity' table instead of default 'account' model for OAuth accounts
 * - Allows users to create up to 5 organizations with 'owner' role as creator
 * - Disables automatic ID generation (assumes custom ID logic in schema)
 * - Supports anonymous authentication alongside email/password and Google OAuth
 *
 * @param db Drizzle database instance - must include all required auth tables (user, session, identity, organization, member, invitation, verification)
 * @param env Environment variables containing auth secrets and OAuth credentials
 * @returns Configured Better Auth instance with email/password and Google OAuth
 * @throws Will fail silently if required database tables are missing from schema
 *
 * @example
 * ```ts
 * const auth = createAuth(database, {
 *   BETTER_AUTH_SECRET: "your-secret",
 *   GOOGLE_CLIENT_ID: "google-id",
 *   GOOGLE_CLIENT_SECRET: "google-secret"
 * });
 * ```
 */
export function createAuth(
  db: DB,
  env: AuthEnv,
): ReturnType<typeof betterAuth> {
  // Validate required env vars early so startup fails fast on misconfiguration
  validateAuthEnv();

  // Use the shared allowed origins
  const allowedOrigins = ALLOWED_ORIGINS;

  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL:
      process.env.BETTER_AUTH_URL || "https://sophia-api.jyoung2k.workers.dev",
    basePath: "/api/auth",

    // Configure CORS and origins
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
      credentials: true,
      maxAge: 86400, // 24 hours
    },

    // Configure trusted origins for authentication (handled below)

    // Session configuration for OAuth state management
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    },
    database: drizzleAdapter(db, {
      provider: "pg",

      schema: {
        identity: Db.identity,
        invitation: Db.invitation,
        member: Db.member,
        organization: Db.organization,
        session: Db.session,
        user: Db.user,
        verification: Db.verification,
      },
    }),

    account: {
      modelName: "identity",
    },

    // Email and password authentication
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false, // Set to true if you want email verification
      sendEmailVerificationOnSignUp: false, // Set to true if you want email verification
    },

    // OAuth providers - use centralized provider config
    socialProviders: {
      google: {
        clientId: getGoogleProviderConfig().clientId,
        clientSecret: getGoogleProviderConfig().clientSecret,
        // Better Auth expects callbackURL casing here
        callbackURL: getGoogleProviderConfig().callbackUrl,
        scope: getGoogleProviderConfig().scope,
        // pass additional optional params if supported by provider integration
        prompt: getGoogleProviderConfig().prompt,
        accessType: getGoogleProviderConfig().accessType,
      },
    },

    // Configure redirect after successful authentication
    redirects: {
      signIn: "https://app.jyoung2k.org/dashboard",
      signUp: "https://app.jyoung2k.org/dashboard",
      signOut: "https://app.jyoung2k.org/",
    },

    // Add callbacks for debugging
    callbacks: {
      signIn: {
        before: async (ctx: any) => {
          console.log("=== BEFORE SIGN IN ===");
          console.log("Provider:", ctx.provider);
          console.log("Account:", ctx.account);
          return ctx;
        },
        after: async (ctx: any) => {
          console.log("=== AFTER SIGN IN ===");
          console.log("User:", ctx.user);
          console.log("Session:", ctx.session);
          console.log("Account:", ctx.account);
          return ctx;
        },
      },
    },

    plugins: [
      anonymous(),
      organization({
        allowUserToCreateOrganization: true,
        organizationLimit: 5,
        creatorRole: "owner",
      }),
    ],

    advanced: {
      database: {
        generateId: false,
      },
      useSecureCookies: true,
      defaultCookieAttributes: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".jyoung2k.org",
        path: "/",
      },
    },

    trustedOrigins: [
      "https://app.jyoung2k.org",
      "https://www.jyoung2k.org",
      "https://sophia-api.jyoung2k.workers.dev",
    ],
  });
}

export type Auth = ReturnType<typeof betterAuth>;

/**
 * Simple helper for Google provider config for Better Auth.
 * - Validates env vars and surfaces clear errors.
 * - Exports a plain config object so existing auth wiring can consume it.
 *
 * Usage:
 * import { getGoogleProviderConfig, validateAuthEnv } from "@repo/api/auth";
 * validateAuthEnv(); // throws if missing
 * const googleProvider = getGoogleProviderConfig();
 * // then pass `googleProvider` to your Better Auth provider registration
 */

type GoogleProviderConfig = {
  id: "google";
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  scope?: string[];
  // Optional extra params that many OAuth clients accept
  prompt?: string;
  accessType?: "online" | "offline";
};

function requiredEnv(key: string): string {
  const v = process.env[key];
  if (!v) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return v;
}

function defaultCallbackUrl(): string {
  // Prefer an explicit env var, fallback to common Cloudflare Worker host used in README.
  // Include provider path so default callback matches provider expectation.
  return (
    process.env.AUTH_CALLBACK_URL ||
    process.env.GOOGLE_OAUTH_CALLBACK_URL || // optional alternate
    process.env.API_BASE_URL || // optional app base
    "https://sophia-api.jyoung2k.workers.dev/api/auth/callback/google"
  );
}

/**
 * Validate overall auth environment. Throws when essential values are missing.
 * Call this early in your server startup to fail fast.
 */
export function validateAuthEnv(): void {
  requiredEnv("BETTER_AUTH_SECRET");
  requiredEnv("GOOGLE_CLIENT_ID");
  requiredEnv("GOOGLE_CLIENT_SECRET");
}

/**
 * Return a plain Google provider configuration object suitable for passing
 * into Better Auth provider registration. Adjust properties for your provider
 * API if needed (e.g. `client_id` naming, additional params).
 */
export function getGoogleProviderConfig(): GoogleProviderConfig {
  const clientId = requiredEnv("GOOGLE_CLIENT_ID");
  const clientSecret = requiredEnv("GOOGLE_CLIENT_SECRET");
  const callbackUrl = defaultCallbackUrl();

  return {
    id: "google",
    clientId,
    clientSecret,
    callbackUrl,
    scope: ["openid", "profile", "email"],
    prompt: "consent",
    accessType: "offline",
  };
}

/**
 * Convenience default export: returns all provider configs (currently Google only).
 * Other providers can be added here later.
 */
export default function getAuthProviders() {
  return {
    providers: [getGoogleProviderConfig()],
    secret: process.env.BETTER_AUTH_SECRET ?? "",
  };
}
