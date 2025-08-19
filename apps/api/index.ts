/**
 * This file exports a Hono application that serves as the main API router.
 * It integrates tRPC for type-safe API endpoints and includes authentication routes.
 * The design allows for flexible deployment, either as a standalone service or
 * as part of an edge environment like Cloudflare Workers.
 *
 * SPDX-FileCopyrightText: 2014-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import type { AppContext } from "./lib/context.js";
import { router } from "./lib/trpc.js";
import { organizationRouter } from "./routers/organization.js";
import { userRouter } from "./routers/user.js";

// tRPC API router
const appRouter = router({
  user: userRouter,
  organization: organizationRouter,
});

// HTTP router
const app = new Hono<AppContext>();

// Import CORS middleware
import { cors } from "./lib/cors";

// Apply CORS middleware to all routes
app.use("*", cors);

// Root endpoint with API information
app.get("/", (c) => {
  return c.json({
    name: "@repo/api",
    version: "0.0.0",
    endpoints: {
      trpc: "/api/trpc",
      auth: "/api/auth",
      health: "/health",
    },
    documentation: {
      trpc: "https://trpc.io",
      auth: "https://www.better-auth.com",
    },
  });
});

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Test CORS endpoint
app.get("/api/test-cors", (c) => {
  return c.json({ message: "CORS is working!" });
});

// Stub endpoint for devtools POST /api/auth/to-j-s-o-n
app.post("/api/auth/to-j-s-o-n", (c) => {
  return c.json({});
});

/*
 * Middleware for initializing database and authentication services.
 *
 * This section initializes the database and auth services for standalone deployment.
 */
import { createAuth } from "./lib/auth.js";
import { createDb } from "./lib/db.js";

app.use("*", async (c, next) => {
  // Debug: log HYPERDRIVE env
  console.log(
    "HYPERDRIVE ENV:",
    c.env.HYPERDRIVE,
    "type:",
    typeof c.env.HYPERDRIVE,
  );
  let db;
  try {
    // If HYPERDRIVE is a string, treat it as a connection string
    const hyperdrive =
      typeof c.env.HYPERDRIVE === "string"
        ? { connectionString: c.env.HYPERDRIVE }
        : c.env.HYPERDRIVE;
    db = createDb(hyperdrive);
    c.set("db", db);
    c.set("auth", createAuth(db, c.env));
  } catch (err) {
    console.error("DB/Auth initialization error:", err);
    throw err;
  }
  await next();
});

// Authentication routes - Better Auth handles all auth endpoints
app.on(["GET", "POST"], "/api/auth/*", async (c) => {
  const auth = c.get("auth");
  if (!auth) {
    console.error("Auth service not initialized");
    return c.json({ error: "Authentication service not available" }, 503);
  }

  console.log(`\n=== AUTH REQUEST ===`);
  console.log(`Auth request: ${c.req.method} ${c.req.path}`);
  console.log(
    "Request headers:",
    Object.fromEntries(c.req.raw.headers.entries()),
  );

  const result = await auth.handler(c.req.raw);

  console.log(`Auth response: ${result.status}`);
  console.log(
    "Response headers:",
    Object.fromEntries(result.headers.entries()),
  );
  console.log("Set-Cookie header exists:", !!result.headers.get("set-cookie"));
  console.log("Raw Set-Cookie:", result.headers.get("set-cookie"));

  if (c.req.path.includes("/callback/") && result.headers.get("set-cookie")) {
    const response = new Response(result.body, {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers,
    });

    // Get existing set-cookie headers
    const setCookieHeaders = result.headers.get("set-cookie");
    if (setCookieHeaders) {
      // Modify cookie to include correct domain and SameSite=None
      const modifiedCookie = setCookieHeaders
        .replace(/Domain=[^;]*/g, "Domain=.jyoung2k.org")
        .replace(/SameSite=[^;]*/g, "SameSite=None");
      response.headers.set("set-cookie", modifiedCookie);
      console.log("Modified cookie headers:", modifiedCookie);
    }

    return response;
  }

  return result;
});

// Test endpoint to debug session creation
app.get("/api/test-session", async (c) => {
  const auth = c.get("auth");
  if (!auth) {
    return c.json({ error: "Auth service not available" }, 503);
  }

  const response = new Response("Cookie test");
  response.headers.set(
    "Set-Cookie",
    "test-cookie=test-value; Domain=.jyoung2k.org; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=3600",
  );

  console.log("Set-Cookie header:", response.headers.get("Set-Cookie"));
  return response;
});

// Test OAuth callback endpoint with fake parameters
app.get("/test-oauth-callback", async (c) => {
  console.log("=== TEST OAUTH CALLBACK ===");
  console.log("Testing OAuth callback handler with fake parameters");

  // Redirect to callback with test parameters
  const testCallbackUrl =
    "https://api.jyoung2k.org/api/auth/callback/google?code=test_code&state=test_state";
  return c.redirect(testCallbackUrl);
});

// tRPC API routes
app.use("/api/trpc/*", (c) => {
  return fetchRequestHandler({
    req: c.req.raw,
    router: appRouter,
    endpoint: "/api/trpc",
    async createContext({ req, resHeaders, info }) {
      const db = c.get("db");
      const auth = c.get("auth");

      if (!db) {
        throw new Error("Database not available in context");
      }

      if (!auth) {
        throw new Error("Authentication service not available in context");
      }

      const sessionData = await auth.api.getSession({
        headers: req.headers,
      });

      return {
        req,
        res: c.res,
        resHeaders,
        info,
        env: c.env,
        db,
        session: sessionData?.session ?? null,
        user: sessionData?.user ?? null,
        cache: new Map(),
      };
    },
    batching: {
      enabled: true,
    },
    onError({ error, path }) {
      console.error("tRPC error on path", path, ":", error);
    },
  });
});

export { getOpenAI } from "./lib/ai.js";
export { createAuth } from "./lib/auth.js";
export { createDb } from "./lib/db.js";
export { appRouter };

export type { AppContext } from "./lib/context.js";
export type AppRouter = typeof appRouter;

export default app;
