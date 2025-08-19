import { useAtom } from "jotai";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { 
  authStateAtom, 
  authActionsAtom, 
  isAuthenticatedAtom
} from "../lib/auth-atoms";
import { authService } from "../lib/auth-service";

export function useAuth() {
  const [authState] = useAtom(authStateAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, dispatch] = useAtom(authActionsAtom);
  const navigate = useNavigate();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const sessionData = await authService.getSession();
        if (sessionData) {
          dispatch({ 
            type: "SET_AUTH_DATA", 
            payload: { user: sessionData.user, session: sessionData.session }
          });
        }
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Failed to initialize auth" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initAuth();
  }, [dispatch]);
  
  const login = useCallback(async (credentials: { email: string; password: string }) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    
    try {
      const result = await authService.signInWithEmail(credentials.email, credentials.password);
      dispatch({ 
        type: "SET_AUTH_DATA", 
        payload: { user: result.user, session: result.session }
      });
      navigate({ to: "/dashboard" });
      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch, navigate]);

  const logout = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    
    try {
      await authService.signOut();
      dispatch({ type: "SIGN_OUT" });
      navigate({ to: "/" });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch, navigate]);

  const signInWithGoogle = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    
    try {
      console.log("Starting Google OAuth");
      
      // Get OAuth URL from Better Auth backend
      const result = await authService.signInWithGoogle();
      
      console.log("OAuth URL:", result.url);
      
      // Redirect to Google OAuth
      window.location.href = result.url;
      
      return { success: true };
    } catch (error) {
      console.error("OAuth error:", error);
      const errorMessage = error instanceof Error ? error.message : "OAuth failed";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch]);

  const refetch = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    
    try {
      const sessionData = await authService.getSession();
      if (sessionData) {
        dispatch({ 
          type: "SET_AUTH_DATA", 
          payload: { user: sessionData.user, session: sessionData.session }
        });
      } else {
        dispatch({ type: "SIGN_OUT" });
      }
    } catch (error) {
      console.warn("Session refetch failed:", error);
      dispatch({ type: "SIGN_OUT" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch]);

  return {
    // State
    user: authState.user,
    session: authState.session,
    isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    
    // Actions
    login,
    logout,
    signInWithGoogle,
    refetch,
  };
}

// Simplified hook for components that only need auth status
export function useAuthStatus() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [authState] = useAtom(authStateAtom);
  
  return { 
    isAuthenticated, 
    isLoading: authState.isLoading 
  };
}

// Hook for getting current user info
export function useCurrentUser() {
  const [authState] = useAtom(authStateAtom);
  return authState.user;
}
