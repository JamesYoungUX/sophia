/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  createRootRoute,
  Outlet,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

export const Route = createRootRoute({
  component: Root,
});

export function Root() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  // Handle authentication state changes
  useEffect(() => {
    if (!isLoading) {
      const publicPaths = ["/login", "/auth/callback"];
      const isPublicPath = publicPaths.some((path) =>
        window.location.pathname.startsWith(path),
      );

      if (!isAuthenticated && !isPublicPath) {
        navigate({ to: "/login" });
      } else if (isAuthenticated && window.location.pathname === "/login") {
        navigate({ to: "/dashboard" });
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Outlet />
      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </>
  );
}
