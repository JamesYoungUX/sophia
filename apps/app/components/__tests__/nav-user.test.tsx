/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavUser } from '../nav-user';

// Mock the auth hook
vi.mock('@/lib/auth', () => ({
  auth: {
    useSession: vi.fn(),
    signOut: vi.fn(),
  },
}));

// Mock the router
vi.mock('@tanstack/react-router', () => ({
  useRouter: vi.fn(() => ({
    navigate: vi.fn(),
  })),
}));

// Mock the sidebar hook
vi.mock('@repo/ui', () => ({
  useSidebar: vi.fn(() => ({ isMobile: false })),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu">{children}</div>,
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu-item">{children}</div>,
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-trigger">{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-label">{children}</div>,
  DropdownMenuSeparator: () => <div data-testid="dropdown-separator" />,
  DropdownMenuGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-group">{children}</div>,
  DropdownMenuItem: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <div data-testid="dropdown-item" onClick={onClick}>{children}</div>
  ),
  SidebarMenuButton: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button data-testid="sidebar-menu-button" onClick={onClick}>{children}</button>
  ),
  Avatar: ({ children }: { children: React.ReactNode }) => <div data-testid="avatar">{children}</div>,
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => <img data-testid="avatar-image" src={src} alt={alt} />,
  AvatarFallback: ({ children }: { children: React.ReactNode }) => <div data-testid="avatar-fallback">{children}</div>,
}));

describe('NavUser', () => {
  const mockSession = {
    user: {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      image: 'https://example.com/avatar.jpg',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user information correctly', () => {
    const { auth } = require('@/lib/auth');
    auth.useSession.mockReturnValue({ data: mockSession });

    render(<NavUser />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-image')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('shows fallback initials when no avatar image', () => {
    const { auth } = require('@/lib/auth');
    auth.useSession.mockReturnValue({
      data: {
        user: {
          ...mockSession.user,
          image: '',
        },
      },
    });

    render(<NavUser />);

    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('JD');
  });

  it('handles account navigation', () => {
    const { auth } = require('@/lib/auth');
    const { useRouter } = require('@tanstack/react-router');
    const mockNavigate = vi.fn();
    
    auth.useSession.mockReturnValue({ data: mockSession });
    useRouter.mockReturnValue({ navigate: mockNavigate });

    render(<NavUser />);

    const accountItem = screen.getByText('Account').closest('[data-testid="dropdown-item"]');
    fireEvent.click(accountItem!);

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/account' });
  });

  it('handles logout functionality', async () => {
    const { auth } = require('@/lib/auth');
    const { useRouter } = require('@tanstack/react-router');
    const mockSignOut = vi.fn().mockResolvedValue(undefined);
    const mockNavigate = vi.fn();
    
    auth.useSession.mockReturnValue({ data: mockSession });
    auth.signOut = mockSignOut;
    useRouter.mockReturnValue({ navigate: mockNavigate });

    render(<NavUser />);

    const logoutItem = screen.getByText('Log out').closest('[data-testid="dropdown-item"]');
    fireEvent.click(logoutItem!);

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('shows default values when no session', () => {
    const { auth } = require('@/lib/auth');
    auth.useSession.mockReturnValue({ data: null });

    render(<NavUser />);

    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
  });
});
