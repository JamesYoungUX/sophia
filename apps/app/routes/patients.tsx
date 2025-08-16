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

export const Route = createFileRoute("/patients")({
  beforeLoad: async ({ context }) => {
    const session = await context.auth.getSession();
    if (!session) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: PatientsPage,
});

function PatientsPage() {
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
                <BreadcrumbPage>Patients</BreadcrumbPage>
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
              <h1 className="text-2xl font-bold mb-4">Patient Management</h1>
              <p className="text-muted-foreground mb-6">
                Manage patient records, appointments, and care coordination.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Patient Registry</h3>
                  <p className="text-sm text-muted-foreground">Search and view patient demographics and records</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Appointments</h3>
                  <p className="text-sm text-muted-foreground">Schedule and manage patient appointments</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Medical Records</h3>
                  <p className="text-sm text-muted-foreground">Access comprehensive patient medical histories</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Care Plans</h3>
                  <p className="text-sm text-muted-foreground">Create and monitor individualized treatment plans</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Discharge Planning</h3>
                  <p className="text-sm text-muted-foreground">Coordinate post-discharge care and follow-up</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Patient Communication</h3>
                  <p className="text-sm text-muted-foreground">Secure messaging and patient portal access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
