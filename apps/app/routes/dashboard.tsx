/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";
import { StatsCard } from "@/components/stats-card";
import { SurgicalTrackingChart } from "@/components/surgical-tracking-chart";
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

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await auth.getSession();
    if (!session) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
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
                <BreadcrumbLink href="/dashboard">
                  Platform
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Console</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <NavUser />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-card p-6 shadow">
              <h2 className="text-xl font-semibold text-muted-foreground mb-4">
                {(() => {
                  const hour = new Date().getHours();
                  if (hour < 12) return `Good morning, ${session?.user?.name?.split(' ')[0] || 'there'}!`;
                  if (hour < 18) return `Good afternoon, ${session?.user?.name?.split(' ')[0] || 'there'}!`;
                  return `Good evening, ${session?.user?.name?.split(' ')[0] || 'there'}!`;
                })()}
              </h2>
              <div className="space-y-4">
                <h3 className="font-semibold text-muted-foreground">Priority Tasks</h3>
                <ul className="space-y-2">
                  {[
                    { id: 1, title: 'Review patient charts', priority: 'high' },
                    { id: 2, title: 'Update treatment plans', priority: 'medium' },
                    { id: 3, title: 'Schedule follow-ups', priority: 'low' },
                  ].map((task) => (
                    <li key={task.id} className="flex items-center justify-between">
                      <span className="text-sm">{task.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <StatsCard
              title="Preoperative Stats"
              data={[
                { name: 'Completed', value: 42, color: 'completed' },
                { name: 'Pending', value: 18, color: 'pending' },
                { name: 'Cancelled', value: 5, color: 'cancelled' },
              ]}
              total={65}
            />
            <StatsCard
              title="Postoperative Stats"
              data={[
                { name: 'Recovered', value: 38, color: 'completed' },
                { name: 'In Recovery', value: 12, color: 'pending' },
                { name: 'Complications', value: 3, color: 'cancelled' },
              ]}
              total={53}
            />
          </div>
          <SurgicalTrackingChart />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
