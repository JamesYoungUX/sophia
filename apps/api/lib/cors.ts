import type { Context } from "hono";

// Dynamically build allowed origins from env or fallback to defaults
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5180",
      "http://127.0.0.1:5180",
      "http://localhost:8787",
      "http://127.0.0.1:8787",
      "http://localhost:8788",
      "http://127.0.0.1:8788",
      "http://localhost:4321",
      // Production domains
      "https://app.jyoung2k.org",
      "https://www.jyoung2k.org",
      "https://fcef7590.sophia-app.pages.dev",
      "https://main.sophia-app.pages.dev",
      "https://a830f2d1.sophia-app.pages.dev",
      "https://3b9002fa.sophia-app.pages.dev",
      "https://68ffae69.sophia-app.pages.dev",
      "https://e248b0b3.sophia-app.pages.dev",
      "https://789d2480.sophia-app.pages.dev",
      "https://e0d3ede0.sophia-app.pages.dev",
      "https://be8673a7.sophia-app.pages.dev",
    ];

// Add debug logging for allowed origins
console.log("CORS Allowed Origins:", ALLOWED_ORIGINS);

// Convert to a Set for faster lookups
const ALLOWED_ORIGINS_SET = new Set(ALLOWED_ORIGINS);

type CorsOptions = {
  origin?: string | string[] | ((origin: string) => string | null | undefined);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
};

const defaultOptions: Required<CorsOptions> = {
  origin: ALLOWED_ORIGINS,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-requested-with",
    "x-client-version",
    "x-client-name",
    "x-client-platform",
    "x-session-id",
    "x-request-id",
  ],
  exposedHeaders: [
    "Content-Length",
    "Content-Type",
    "X-Request-Id",
    "X-Response-Time",
  ],
  credentials: true,
  maxAge: 86400, // 24 hours
};

export function corsMiddleware(options: CorsOptions = {}) {
  const { methods, allowedHeaders, exposedHeaders, maxAge } = {
    ...defaultOptions,
    ...options,
  } as const;

  return async (c: Context, next: () => Promise<void>) => {
    const requestOrigin = c.req.header("Origin") || "";
    const isPreflight = c.req.method === "OPTIONS";

    // Handle preflight requests
    if (isPreflight) {
      console.log("Preflight request received");
      console.log("Request Origin:", requestOrigin);
      console.log("Allowed Origins:", Array.from(ALLOWED_ORIGINS_SET));
      console.log(
        "Origin in allowed set:",
        ALLOWED_ORIGINS_SET.has(requestOrigin || ""),
      );

      // Only process CORS for allowed origins
      if (requestOrigin && ALLOWED_ORIGINS_SET.has(requestOrigin)) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");

        // Set CORS headers
        c.res.headers.set("Access-Control-Allow-Origin", requestOrigin);
        c.res.headers.set("Access-Control-Allow-Credentials", "true");
        c.res.headers.set("Access-Control-Allow-Methods", methods.join(", "));

        // Set allowed headers if requested
        if (requestHeaders) {
          c.res.headers.set(
            "Access-Control-Allow-Headers",
            allowedHeaders.join(", "),
          );
        }

        // Set max age for preflight cache
        c.res.headers.set("Access-Control-Max-Age", maxAge.toString());

        // Set exposed headers
        if (exposedHeaders.length > 0) {
          c.res.headers.set(
            "Access-Control-Expose-Headers",
            exposedHeaders.join(", "),
          );
        }

        // Return 204 No Content for preflight
        return new Response(null, {
          status: 204,
          headers: Object.fromEntries(c.res.headers.entries()),
        });
      }

      // For preflight requests from non-allowed origins, return 403
      return new Response(null, { status: 403 });
    }

    // For non-preflight requests, set CORS headers if origin is allowed
    if (requestOrigin && ALLOWED_ORIGINS_SET.has(requestOrigin)) {
      c.res.headers.set("Access-Control-Allow-Origin", requestOrigin);
      c.res.headers.set("Access-Control-Allow-Credentials", "true");

      // Set exposed headers for non-preflight requests
      if (exposedHeaders.length > 0) {
        c.res.headers.set(
          "Access-Control-Expose-Headers",
          exposedHeaders.join(", "),
        );
      }
    }

    // Continue to the next middleware
    await next();
  };
}

// Default CORS middleware with common settings
export const cors = corsMiddleware();
