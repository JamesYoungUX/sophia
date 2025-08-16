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
 * This section is commented out by default. It should be enabled when
 * deploying the `api` package as a standalone service (e.g., to Google Cloud Run).
 *
 * When this API is deployed as part of the `edge` package (Cloudflare Workers),
 * the `db` and `auth` context variables are initialized upstream.
 */
// app.use("*", async (c, next) => {
//   // Debug: log HYPERDRIVE env
//   console.log(
//     "HYPERDRIVE ENV:",
//     c.env.HYPERDRIVE,
//     "type:",
//     typeof c.env.HYPERDRIVE,
//   );
//   let db;
//   try {
//     // If HYPERDRIVE is a string, treat it as a connection string
//     const hyperdrive = typeof c.env.HYPERDRIVE === "string"
//       ? { connectionString: c.env.HYPERDRIVE }
//       : c.env.HYPERDRIVE;
//     db = createDb(hyperdrive);
//     c.set("db", db);
//     c.set("auth", createAuth(db, c.env));
//   } catch (err) {
//     console.error("DB/Auth initialization error:", err);
//     throw err;
//   }
//   await next();
// });

// Authentication routes
app.on(["GET", "POST", "OPTIONS"], "/api/auth/*", async (c) => {
  // Handle CORS preflight requests
  if (c.req.method === "OPTIONS") {
    const response = new Response(null, { status: 204 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    return response;
  }

  // Log the incoming request
  console.log("\n=== AUTH REQUEST ===");
  console.log("Path:", c.req.path);
  console.log("Method:", c.req.method);
  console.log("URL:", c.req.url);

  // For all auth routes, use the auth handler
  try {
    const auth = c.get("auth");
    if (!auth) {
      console.error("Auth service not initialized in context");
      return c.json({ error: "Authentication service not available" }, 503);
    }

    // Log request body for login attempts
    if (c.req.path === "/api/auth/sign-in/email" && c.req.method === "POST") {
      try {
        const body = await c.req.json();
        console.log("Login attempt with email:", body.email);
        // Reconstruct the request with the parsed body
        const newReq = new Request(c.req.raw, {
          body: JSON.stringify(body),
        });
        const result = await auth.handler(newReq);
        console.log("Auth response status:", result.status);
        return new Response(result.body, result);
      } catch (error) {
        console.error("Error processing login request:", error);
        return c.json({ error: "Invalid request body" }, 400);
      }
    }

    // Handle other auth routes
    const result = await auth.handler(c.req.raw);

    console.log("Auth handler result:", {
      status: result.status,
      statusText: result.statusText,
      url: c.req.url,
      method: c.req.method,
    });

    // Create a new response to ensure CORS headers are set correctly
    const response = new Response(result.body, {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers,
    });

    // Set CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    return response;
  } catch (error) {
    console.error("Error in auth handler:", error);
    const errorResponse = c.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
        ...(process.env.NODE_ENV === "development" && {
          stack: error instanceof Error ? error.stack : undefined,
        }),
      },
      500,
    );

    // Ensure CORS headers are set on error responses
    errorResponse.headers.set("Access-Control-Allow-Origin", "*");
    errorResponse.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS",
    );
    errorResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    return errorResponse;
  }
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
