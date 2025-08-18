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

export const Route = createFileRoute("/history")({
  beforeLoad: async ({ context }) => {
    const session = await context.auth.getSession();
    if (!session) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: HistoryPage,
});

function HistoryPage() {
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
                <BreadcrumbPage>History</BreadcrumbPage>
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
              <h1 className="text-2xl font-bold mb-4">Activity History</h1>
              <p className="text-muted-foreground mb-6">
                View your recent activities, system logs, and audit trail.
              </p>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Patient Chart Accessed</h3>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Viewed medical records for Patient ID: 12345</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Surgery Scheduled</h3>
                    <span className="text-sm text-muted-foreground">4 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Scheduled cardiac procedure for Patient ID: 67890</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Clinical Guidelines Updated</h3>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Updated post-operative care protocols</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Lab Results Reviewed</h3>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Analyzed blood work for multiple patients</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">System Login</h3>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Accessed Sophia platform from workstation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
