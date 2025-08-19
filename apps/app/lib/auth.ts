/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createAuthClient } from "better-auth/react";

export const auth = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || "https://api.jyoung2k.org",
  fetchOptions: {
    credentials: "include",
  },
  onError: (error: unknown) => {
    console.error("Better Auth error:", error);
  },
  // Add explicit session handling for OAuth callbacks
  onSessionUpdate: (session: unknown) => {
    console.log("Session updated:", session);
  },
});

export { auth as authClient };
