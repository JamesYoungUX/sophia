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

    // Configure CORS and origins
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
      credentials: true,
      maxAge: 86400, // 24 hours
    },

    // Configure trusted origins for authentication
    trustedOrigins: allowedOrigins,
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
      fields: {
        // Map the fields from the identity table to what Better Auth expects
        // Using snake_case to match the database schema
        accountId: "account_id",
        providerId: "provider_id",
        userId: "user_id",
        accessToken: "access_token",
        refreshToken: "refresh_token",
        idToken: "id_token",
        accessTokenExpiresAt: "access_token_expires_at",
        refreshTokenExpiresAt: "refresh_token_expires_at",
        password: "password",
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    },

    // Email and password authentication
    emailAndPassword: {
      enabled: true,
      // Explicitly set the provider ID for email/password auth
      providerId: "email",
      // Configure the credential lookup to match the database schema
      credentialFields: {
        accountId: "account_id",
        providerId: "provider_id",
        password: "password"
      },
      // Add debug logging for credential verification
      debug: process.env.NODE_ENV !== 'production',
      // Ensure we're using the correct field names for the credential lookup
      fields: {
        accountId: "account_id",
        providerId: "provider_id",
        password: "password"
      }
    },

    // OAuth providers
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
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
    },
  });
}

export type Auth = ReturnType<typeof betterAuth>;
