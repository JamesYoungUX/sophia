import { auth } from "../lib/auth";
import { useNavigate } from "@tanstack/react-router";

export function useAuth() {
  const { data: session, isPending, error, refetch } = auth.useSession();
  const navigate = useNavigate();
  
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const result = await auth.signIn.email(credentials);
      if (result.data) {
        navigate({ to: "/dashboard" });
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      navigate({ to: "/" });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google OAuth");
      
      // Use Better Auth's signIn.social method which handles the OAuth flow properly
      const result = await auth.signIn.social({
        provider: "google",
        callbackURL: "https://app.jyoung2k.org/dashboard",
      });
      
      console.log("OAuth result:", result);
      
      // After OAuth, refetch session to ensure frontend has latest state
      await refetch();
      
      // Navigate to dashboard if successful
      if (result.data) {
        navigate({ to: "/dashboard" });
        return { success: true, data: result.data };
      }
      
      return { success: true };
    } catch (error) {
      console.error("OAuth error:", error);
      return { success: false, error };
    }
  };

  return {
    // State
    user: session?.user || null,
    session: session || null,
    isAuthenticated: !!session,
    isLoading: isPending,
    error,
    
    // Actions
    login,
    logout,
    signInWithGoogle,
    refetch,
  };
}

// Simplified hook for components that only need auth status
export function useAuthStatus() {
  const { data: session, isPending } = auth.useSession();
  
  return { 
    isAuthenticated: !!session, 
    isLoading: isPending 
  };
}

// Hook for getting current user info
export function useCurrentUser() {
  const { data: session } = auth.useSession();
  return session?.user || null;
}
