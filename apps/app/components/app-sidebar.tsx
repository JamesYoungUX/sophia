/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  Heart,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Bone,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { TeamSwitcher } from "@/components/team-switcher"
import { FaviconIcon } from "@/components/favicon-icon"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui"

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
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  management: [
    {
      name: "Care Plans",
      url: "#",
      icon: Frame,
    },
    {
      name: "Access",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Agents",
      url: "#",
      icon: Map,
    },
    {
      name: "Documentation",
      url: "#",
      icon: BookOpen,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.management} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
