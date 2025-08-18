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
  // Use the shared allowed origins
  const allowedOrigins = ALLOWED_ORIGINS;

  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "https://sophia-api.jyoung2k.workers.dev",
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

    // OAuth providers
    // TODO: Add user access control for production deployment
    // Options: 1) Domain restriction in Google Console, 2) User allowlist in database,
    // 3) Invitation-only system with admin approval workflow
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: `${process.env.BETTER_AUTH_URL || "https://sophia-api.jyoung2k.workers.dev"}/api/auth/callback/google`,
        scope: ["email", "profile"],
      },
    },

    // Configure redirect after successful authentication
    redirects: {
      signIn: "https://app.jyoung2k.org/dashboard",
      signUp: "https://app.jyoung2k.org/dashboard", 
      signOut: "https://app.jyoung2k.org/",
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
        sameSite: "lax",
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
