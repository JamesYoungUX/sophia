import { NavUser } from "@/components/nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger,
} from "@repo/ui";
import { useLocation } from "@tanstack/react-router";
import React from "react";

const breadcrumbMap: Record<string, { label: string; href?: string }[]> = {
  "/console": [{ label: "Platform", href: "/console" }, { label: "Console" }],
  "/clinical-support": [
    { label: "Console", href: "/console" },
    { label: "Clinical Support" },
  ],
  "/compliance-agent": [
    { label: "Agents", href: "/console" },
    { label: "Compliance Agent" },
  ],
  "/agents/genesis-agent": [
    { label: "Agents", href: "/console" },
    { label: "Genesis Agent" },
  ],
  "/agents/quantum-agent": [
    { label: "Agents", href: "/console" },
    { label: "Quantum Agent" },
  ],
  "/agents/care-manager-agent": [
    { label: "Agents", href: "/console" },
    { label: "Care Manager Agent" },
  ],
  "/docs/care-plan-lifecycle": [
    { label: "Documentation", href: "/" },
    { label: "Care Plan Lifecycle & Agent Roles" },
  ],
  "/care-plans": [
    { label: "Care Plans", href: "/care-plans" },
    { label: "Overview" },
  ],
};

export function BreadcrumbHeader() {
  const location = useLocation();
  // Use only the pathname without query/hash
  const path = location.pathname.split("?")[0].split("#")[0];
  const crumbs = breadcrumbMap[path] || [];

  return (
    <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label + idx}>
              <BreadcrumbItem className={idx === 0 ? "hidden md:block" : ""}>
                {crumb.href ? (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {idx < crumbs.length - 1 && (
                <BreadcrumbSeparator
                  key={crumb.label + idx + "-sep"}
                  className={idx === 0 ? "hidden md:block" : ""}
                />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto">
        <NavUser />
      </div>
    </header>
  );
}
