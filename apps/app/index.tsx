console.log("[app] index.tsx entry loaded");
/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai";
import { auth } from "./lib/auth";
import { routeTree } from "./lib/routeTree.gen";
import { store } from "./lib/store";
import { AuthCallbackHandler } from "./components/auth-callback-handler";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container!);
const router = createRouter({
  routeTree,
  context: {
    auth,
  },
});

root.render(
  <StrictMode>
    <Provider store={store}>
      <AuthCallbackHandler>
        <RouterProvider router={router} />
      </AuthCallbackHandler>
    </Provider>
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
