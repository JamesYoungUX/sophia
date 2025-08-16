/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Layout } from "@/components/layout";
import { LoginForm } from "@/components/login-form";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { auth } from "@/lib/auth";

export const Route = createRootRoute({
  component: Root,
});

export function Root() {
  const { data: session, isPending } = auth.useSession();
  const navigate = useNavigate();

  // Redirect to home after successful login
  useEffect(() => {
    if (session) {
      navigate({ to: "/" });
    }
  }, [session, navigate]);

  if (isPending) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!session) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  );
}
