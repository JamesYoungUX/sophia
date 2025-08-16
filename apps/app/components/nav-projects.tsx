/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

"use client";

import { ChevronDown, ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui";

export function NavProjects({
  projects,
  ...props
}: { projects: any[] } & React.HTMLAttributes<HTMLDivElement>) {
  const { isMobile } = useSidebar();
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);

  const toggleGroup = (name: string) => {
    setOpenGroup((prev) => (prev === name ? null : name));
  };

  return (
    <SidebarGroup {...props} className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <React.Fragment key={item.name}>
            {item.items &&
            Array.isArray(item.items) &&
            item.items.length > 0 ? (
              <>
                <SidebarMenuItem className="relative">
                  <SidebarMenuButton
                    asChild
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGroup(item.name);
                    }}
                  >
                    <div className="flex items-center cursor-pointer select-none relative w-full">
                      <item.icon />
                      <span className="ml-2">{item.name}</span>
                      <span className="ml-auto absolute right-2 top-1/2 -translate-y-1/2">
                        {openGroup === item.name ? (
                          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                        )}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {openGroup === item.name && (
                  <div className="relative">
                    <div
                      className="absolute left-3 top-0 bottom-0 w-px bg-muted-foreground/30"
                      style={{ zIndex: 0 }}
                    />
                    {item.items.map((sub) => (
                      <SidebarMenuItem
                        key={sub.name}
                        className="pl-8 relative z-10"
                      >
                        <SidebarMenuButton asChild>
                          <a href={sub.url}>
                            <sub.icon />
                            <span>{sub.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem>
                      <span>View Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Share Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <span>Delete Project</span>
                      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            )}
          </React.Fragment>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <Plus className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
