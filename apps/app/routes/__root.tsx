/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/auth";
import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: Root,
});

export function Root() {
  const { data: session, isPending, error } = auth.useSession();
  const navigate = useNavigate();
  const location = useLocation();

  // Debug logging
  useEffect(() => {
    console.log("Root component - Session state:", {
      session,
      isPending,
      error,
      pathname: location.pathname
    });
  }, [session, isPending, error, location.pathname]);

  // Redirect to dashboard after successful login only if on root or login
  useEffect(() => {
    if (
      session &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      console.log("Redirecting to dashboard with session:", session);
      navigate({ to: "/dashboard" });
    }
  }, [session, navigate, location.pathname]);

  // Show loading state while checking session
  if (isPending) {
    console.log("Showing loading state");
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  // Show login form if no session
  if (!session) {
    console.log("No session found, showing login form");
    return <LoginForm />;
  }

  // Render protected routes
  console.log("Rendering protected routes for user:", session.user);
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
