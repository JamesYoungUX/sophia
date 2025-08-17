// @vitest-environment happy-dom
/// <reference types="vitest/globals" />
/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { SidebarProvider } from "@repo/ui";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppSidebar } from "../app-sidebar";

describe("AppSidebar", () => {
  it("renders all main sections", () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
  });

  it("renders team switcher with medical departments", () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>,
    );

    expect(screen.getByTestId("team-switcher")).toBeInTheDocument();
    expect(screen.getByText("Sophia")).toBeInTheDocument();
    expect(screen.getByText("Cardiology")).toBeInTheDocument();
    expect(screen.getByText("Orthopedics")).toBeInTheDocument();
  });

  it("renders main navigation with Console", () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>,
    );

    expect(screen.getAllByTestId("nav-main")[0]).not.toBeNull();
    expect(screen.getByText("Console")).toBeInTheDocument();
  });

  it("renders management section", () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>,
    );

    expect(screen.getAllByTestId("nav-projects")[0]).not.toBeNull();
    expect(screen.getByText("Plans")).toBeInTheDocument();
    expect(screen.getByText("Access")).toBeInTheDocument();
    expect(screen.getByText("Agents")).toBeInTheDocument();
  });

  it("has correct data structure for teams", () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>,
    );

    // Verify medical departments are present
    expect(screen.getAllByText("Cardiology").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Orthopedics").length).toBeGreaterThan(0);
  });
});
