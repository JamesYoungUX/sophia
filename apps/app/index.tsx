console.log("[app] index.tsx entry loaded");
console.log("VITE_API_URL at runtime:", import.meta.env.VITE_API_URL);
/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Provider } from "jotai";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthCallbackHandler } from "./components/auth-callback-handler";
import ErrorBoundary from "./components/error-boundary";
import { routeTree } from "./lib/routeTree.gen";
import { store } from "./lib/store";
import "./styles/globals.css";

// Create the router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // We'll inject this in the provider
  },
});

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Get the root element
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Render the app
root.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <AuthCallbackHandler>
          <RouterProvider
            router={router}
            defaultErrorComponent={({ error }) => (
              <div className="p-4 text-red-600">
                <h2>Something went wrong</h2>
                <p>{error.message}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Reload
                </button>
              </div>
            )}
          />
        </AuthCallbackHandler>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);

// Enable HMR in development
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.invalidate());
}
