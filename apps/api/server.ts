/**
 * Simple server startup file to get API running on port 8787
 */

import { Hono } from "hono";
import { getPlatformProxy } from "wrangler";
import api from "./index.js";
import { createAuth } from "./lib/auth.js";
import type { AppContext } from "./lib/context.js";
import { createDb } from "./lib/db.js";
import type { Env } from "./lib/env.js";

type CloudflareEnv = {
  HYPERDRIVE: Hyperdrive;
  HYPERDRIVE_DIRECT: Hyperdrive;
} & Env;

const app = new Hono<AppContext>();

// Create a local Cloudflare environment proxy
const cf = await getPlatformProxy<CloudflareEnv>({
  configPath: "../edge/wrangler.jsonc",
  persist: true,
});

// Middleware to inject database binding into request context
app.use("*", async (c, next) => {
  const db = createDb(cf.env.HYPERDRIVE);
  c.set("db", db);
  c.set("auth", createAuth(db, cf.env));
  await next();
});

// Mount the main API routes
app.route("/", api);

// Start the server
const port = 8787;
const server = Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`🚀 API server listening on http://localhost:${port}`);
console.log(`Health check: http://localhost:${port}/health`);
console.log(`Auth endpoints: http://localhost:${port}/api/auth/*`);
