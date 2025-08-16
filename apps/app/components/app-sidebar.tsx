/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Bone,
  BookOpen,
  Bot,
  Frame,
  Heart,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

import { FaviconIcon } from "@/components/favicon-icon";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Sophia",
      logo: FaviconIcon,
      plan: "Enterprise",
    },
    {
      name: "Cardiology",
      logo: Heart,
      plan: "Department",
    },
    {
      name: "Orthopedics",
      logo: Bone,
      plan: "Department",
    },
  ],
  navMain: [
    {
      title: "Console",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Clinical Support",
          url: "/clinical-support",
        },
        {
          title: "Patients",
          url: "/patients",
        },
        {
          title: "History",
          url: "/history",
        },
      ],
    },
  ],
  management: [
    {
      name: "Care Plans",
      url: "#",
      icon: Frame,
      items: [
        {
          name: "Care Plan A",
          url: "#",
          icon: Frame,
        },
        {
          name: "Care Plan B",
          url: "#",
          icon: Frame,
        },
      ],
    },
    {
      name: "Access",
      url: "#",
      icon: PieChart,
      items: [
        {
          name: "Access Log",
          url: "#",
          icon: PieChart,
        },
        {
          name: "Permissions",
          url: "#",
          icon: PieChart,
        },
      ],
    },
    {
      name: "Agents",
      url: "#",
      icon: Map,
      items: [
        {
          name: "Genesis (Model)",
          url: "#",
          icon: Bot,
        },
        {
          name: "Explorer (Model)",
          url: "#",
          icon: Bot,
        },
        {
          name: "Quantum (Model)",
          url: "#",
          icon: Bot,
        },
      ],
    },
    {
      name: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          name: "API Reference",
          url: "#",
          icon: BookOpen,
        },
        {
          name: "User Guide",
          url: "#",
          icon: BookOpen,
        },
      ],
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          name: "General",
          url: "#",
          icon: Settings2,
        },
        {
          name: "Team",
          url: "#",
          icon: Settings2,
        },
        {
          name: "Billing",
          url: "#",
          icon: Settings2,
        },
        {
          name: "Limits",
          url: "#",
          icon: Settings2,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar data-testid="sidebar" collapsible="icon" {...props}>
      <SidebarHeader data-testid="sidebar-header">
        <TeamSwitcher data-testid="team-switcher-root" teams={data.teams} />
      </SidebarHeader>
      <SidebarContent data-testid="sidebar-content">
        <NavMain data-testid="nav-main" items={data.navMain} />
        <NavProjects data-testid="nav-projects" projects={data.management} />
      </SidebarContent>
      <SidebarFooter data-testid="sidebar-footer"></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
