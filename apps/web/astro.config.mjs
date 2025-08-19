/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

// Load environment variables
loadEnv(process.env.NODE_ENV || "production", "../../", "");

// https://astro.build/config
export default defineConfig({
  site: "https://app.jyoung2k.org",
  output: "static",
  srcDir: ".",
  integrations: [
    react({
      include: ['**/components/*.tsx', '**/components/*.jsx', '**/lib/*.tsx', '**/lib/*.jsx'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    ssr: {
      // Ensure externalized deps don't break SSR
      noExternal: ["@repo/ui"],
    },
    build: {
      // Generate source maps for better debugging
      sourcemap: true,
    },
    optimizeDeps: {
      exclude: ['@repo/ui'],
    },
    resolve: {
      preserveSymlinks: true,
    },
  },
});
