/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { LoginForm } from "@/components/login-form";
import { createFileRoute } from "@tanstack/react-router";

// Set the login page as the default landing page
export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
