/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavUser } from "../nav-user";

vi.mock("../../lib/auth", () => ({
  auth: {
    useSession: vi.fn(),
    signOut: vi.fn(),
  },
}));
const { auth } = require("../../lib/auth");

describe("NavUser", () => {
  const mockSession = {
    user: {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      image: "https://example.com/avatar.jpg",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user information correctly", () => {
    auth.useSession.mockReturnValue({ data: mockSession });

    render(<NavUser />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-image")).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg",
    );
  });

  it("shows fallback initials when no avatar image", () => {
    auth.useSession.mockReturnValue({
      data: {
        user: {
          ...mockSession.user,
          image: "",
        },
      },
    });

    render(<NavUser />);

    expect(screen.getByTestId("avatar-fallback")).toHaveTextContent("JD");
  });

  it("handles account navigation", () => {
    const { useRouter } = require("@tanstack/react-router");
    const mockNavigate = vi.fn();

    auth.useSession.mockReturnValue({ data: mockSession });
    useRouter.mockReturnValue({ navigate: mockNavigate });

    render(<NavUser />);

    const accountItem = screen
      .getByText("Account")
      .closest('[data-testid="dropdown-item"]');
    fireEvent.click(accountItem!);

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/account" });
  });

  it("handles logout functionality", async () => {
    const { useRouter } = require("@tanstack/react-router");
    const mockSignOut = vi.fn().mockResolvedValue(undefined);
    const mockNavigate = vi.fn();

    auth.useSession.mockReturnValue({ data: mockSession });
    auth.signOut = mockSignOut;
    useRouter.mockReturnValue({ navigate: mockNavigate });

    render(<NavUser />);

    const logoutItem = screen
      .getByText("Log out")
      .closest('[data-testid="dropdown-item"]');
    fireEvent.click(logoutItem!);

    expect(mockSignOut).toHaveBeenCalled();
  });

  it("shows default values when no session", () => {
    auth.useSession.mockReturnValue({ data: null });

    render(<NavUser />);

    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("user@example.com")).toBeInTheDocument();
  });
});
