/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Types for auth state
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

// Base auth atoms
export const userAtom = atomWithStorage<User | null>("auth-user", null);
export const sessionAtom = atomWithStorage<Session | null>("auth-session", null);
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

// Derived atoms
export const isAuthenticatedAtom = atom((get) => {
  const session = get(sessionAtom);
  const user = get(userAtom);
  return !!(session && user);
});

export const authStateAtom = atom<AuthState>((get) => ({
  user: get(userAtom),
  session: get(sessionAtom),
  isLoading: get(isLoadingAtom),
  error: get(errorAtom),
}));

// Auth actions atom
export const authActionsAtom = atom(null, (get, set, action: AuthAction) => {
  switch (action.type) {
    case "SET_LOADING":
      set(isLoadingAtom, action.payload);
      break;
    case "SET_ERROR":
      set(errorAtom, action.payload);
      break;
    case "SET_USER":
      set(userAtom, action.payload);
      break;
    case "SET_SESSION":
      set(sessionAtom, action.payload);
      break;
    case "SIGN_OUT":
      set(userAtom, null);
      set(sessionAtom, null);
      set(errorAtom, null);
      break;
    case "SET_AUTH_DATA":
      set(userAtom, action.payload.user);
      set(sessionAtom, action.payload.session);
      set(errorAtom, null);
      break;
  }
});

// Action types
export type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_SESSION"; payload: Session | null }
  | { type: "SIGN_OUT" }
  | { type: "SET_AUTH_DATA"; payload: { user: User | null; session: Session | null } };
