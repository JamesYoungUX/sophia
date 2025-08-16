/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppSidebar } from '../app-sidebar';

// Mock the child components
vi.mock('../nav-main', () => ({
  NavMain: ({ items }: { items: any[] }) => (
    <div data-testid="nav-main">
      {items.map(item => <div key={item.title}>{item.title}</div>)}
    </div>
  ),
}));

vi.mock('../nav-projects', () => ({
  NavProjects: ({ projects }: { projects: any[] }) => (
    <div data-testid="nav-projects">
      {projects.map(project => <div key={project.name}>{project.name}</div>)}
    </div>
  ),
}));

vi.mock('../team-switcher', () => ({
  TeamSwitcher: ({ teams }: { teams: any[] }) => (
    <div data-testid="team-switcher">
      {teams.map(team => <div key={team.name}>{team.name}</div>)}
    </div>
  ),
}));

vi.mock('../favicon-icon', () => ({
  FaviconIcon: () => <div data-testid="favicon-icon">Favicon</div>,
}));

// Mock Shadcn UI components
vi.mock('@repo/ui', () => ({
  Sidebar: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar">{children}</div>,
  SidebarContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-content">{children}</div>,
  SidebarHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-header">{children}</div>,
  SidebarFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-footer">{children}</div>,
  SidebarRail: () => <div data-testid="sidebar-rail" />,
}));

describe('AppSidebar', () => {
  it('renders all main sections', () => {
    render(<AppSidebar />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument();
  });

  it('renders team switcher with medical departments', () => {
    render(<AppSidebar />);

    expect(screen.getByTestId('team-switcher')).toBeInTheDocument();
    expect(screen.getByText('Sophia')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('Orthopedics')).toBeInTheDocument();
  });

  it('renders main navigation with Console', () => {
    render(<AppSidebar />);

    expect(screen.getByTestId('nav-main')).toBeInTheDocument();
    expect(screen.getByText('Console')).toBeInTheDocument();
  });

  it('renders management section', () => {
    render(<AppSidebar />);

    expect(screen.getByTestId('nav-projects')).toBeInTheDocument();
    expect(screen.getByText('Plans')).toBeInTheDocument();
    expect(screen.getByText('Access')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
  });

  it('has correct data structure for teams', () => {
    render(<AppSidebar />);

    // Verify medical departments are present
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('Orthopedics')).toBeInTheDocument();
  });
});
