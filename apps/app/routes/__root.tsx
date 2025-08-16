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
  const { data: session, isPending } = auth.useSession();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard after successful login only if on root or login
  useEffect(() => {
    if (
      session &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      navigate({ to: "/dashboard" });
    }
  }, [session, navigate, location.pathname]);

  if (isPending) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!session) {
    return <LoginForm />;
  }

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
