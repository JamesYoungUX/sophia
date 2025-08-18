/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createAuthClient } from "better-auth/react";

export const auth = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8791',
  fetchOptions: {
    credentials: 'include',
  },
  onError: (error: unknown) => {
    console.error("Better Auth error:", error);
  },
});

export { auth as authClient };
