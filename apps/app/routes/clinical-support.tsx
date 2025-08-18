/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui";

export const Route = createFileRoute("/clinical-support")({
  beforeLoad: async ({ context }) => {
    const session = await context.auth.getSession();
    if (!session) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: ClinicalSupportPage,
});

function ClinicalSupportPage() {
  const { data: session } = auth.useSession();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Clinical Support</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <NavUser />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <div className="rounded-xl bg-card p-6 shadow">
              <h1 className="text-2xl font-bold mb-4">Clinical Support</h1>
              <p className="text-muted-foreground mb-6">
                Access clinical resources, guidelines, and support tools to assist with patient care decisions.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Clinical Guidelines</h3>
                  <p className="text-sm text-muted-foreground">Evidence-based treatment protocols and best practices</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Drug Reference</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive medication database and interactions</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Consultation</h3>
                  <p className="text-sm text-muted-foreground">Connect with specialists and clinical experts</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Emergency Protocols</h3>
                  <p className="text-sm text-muted-foreground">Quick access to emergency procedures and contacts</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Lab Results</h3>
                  <p className="text-sm text-muted-foreground">Interpret and analyze laboratory findings</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Clinical Decision Support</h3>
                  <p className="text-sm text-muted-foreground">AI-powered recommendations and alerts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
