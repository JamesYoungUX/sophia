/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

// Load environment variables
loadEnv(process.env.NODE_ENV || "production", "../../", "");

// https://astro.build/config
export default defineConfig({
  site: "https://app.jyoung2k.org",
  output: "static",
  adapter: "@astrojs/cloudflare",
  integrations: [react()],
  vite: {
    ssr: {
      // Ensure externalized deps don't break SSR
      noExternal: ["@repo/ui"],
    },
    build: {
      // Generate source maps for better debugging
      sourcemap: true,
      // Bundle size optimizations
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            vendor: ["@repo/ui"],
          },
        },
      },
    },
  },
});
