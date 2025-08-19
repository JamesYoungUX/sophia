/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { authActionsAtom } from "../lib/auth-atoms";
import { authService } from "../lib/auth-service";

interface AuthCallbackHandlerProps {
  children: React.ReactNode;
}

export function AuthCallbackHandler({ children }: AuthCallbackHandlerProps) {
  const [, dispatch] = useAtom(authActionsAtom);
  const navigate = useNavigate();
  const search = useSearch({ from: "__root__" }) as Record<string, string>;

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Check if this is an OAuth callback (has code and state parameters)
      if (search.code && search.state) {
        dispatch({ type: "SET_LOADING", payload: true });
        
        try {
          // Wait a moment for the backend to process the OAuth callback
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check for session after OAuth callback
          const sessionData = await authService.getSession();
          
          if (sessionData) {
            dispatch({ 
              type: "SET_AUTH_DATA", 
              payload: { user: sessionData.user, session: sessionData.session }
            });
            
            // Navigate to dashboard on successful auth
            navigate({ to: "/dashboard" });
          } else {
            // If no session found, try to refresh
            const refreshedSession = await authService.refreshSession();
            
            if (refreshedSession) {
              dispatch({ 
                type: "SET_AUTH_DATA", 
                payload: { user: refreshedSession.user, session: refreshedSession.session }
              });
              navigate({ to: "/dashboard" });
            } else {
              dispatch({ type: "SET_ERROR", payload: "OAuth authentication failed" });
              navigate({ to: "/" });
            }
          }
        } catch (error) {
          console.error("OAuth callback error:", error);
          dispatch({ type: "SET_ERROR", payload: "OAuth authentication failed" });
          navigate({ to: "/" });
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    };

    handleOAuthCallback();
  }, [search.code, search.state, dispatch, navigate]);

  return <>{children}</>;
}
