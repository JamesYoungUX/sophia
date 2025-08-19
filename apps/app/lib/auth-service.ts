/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import type { Session, User } from "./auth-atoms";

// Better Auth backend service interface
class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL =
      import.meta.env.VITE_API_URL || "https://sophia-api.jyoung2k.workers.dev";
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseURL}/api/auth${endpoint}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Auth request failed: ${response.status}`);
    }

    return response;
  }

  async signInWithGoogle(): Promise<{ url: string }> {
    const response = await this.request("/signin/google", {
      method: "POST",
    });

    return response.json();
  }

  async signInWithEmail(
    email: string,
    password: string,
  ): Promise<{ user: User; session: Session }> {
    const response = await this.request("/sign-in/email", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  }

  async signOut(): Promise<void> {
    await this.request("/sign-out", {
      method: "POST",
    });
  }

  async getSession(): Promise<{ user: User; session: Session } | null> {
    try {
      const response = await this.request("/session");

      if (response.status === 404) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn("Session check failed:", error);
      return null;
    }
  }

  async refreshSession(): Promise<{ user: User; session: Session } | null> {
    try {
      const response = await this.request("/session/refresh", {
        method: "POST",
      });

      return response.json();
    } catch (error) {
      console.warn("Session refresh failed:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
