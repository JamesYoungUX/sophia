/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { LoginForm } from "@/components/login-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await auth.getSession();
    if (session) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
