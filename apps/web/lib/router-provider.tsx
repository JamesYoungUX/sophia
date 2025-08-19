// Mock RouterProvider for the marketing site
// This provides a mock implementation of TanStack Router context
// to prevent errors when UI components try to use router hooks

import React, { createContext, useContext } from 'react';

// Create a mock router context that matches the shape expected by components
const RouterContext = createContext({
  navigate: () => {},
  state: {},
  history: { location: { pathname: '/' } },
  latestLocation: { pathname: '/' },
});

// Export a mock useRouter hook that components can use
export const useRouter = () => useContext(RouterContext);

// Mock RouterProvider component
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const mockRouterValue = {
    navigate: () => {},
    state: {},
    history: { location: { pathname: '/' } },
    latestLocation: { pathname: '/' },
  };

  return (
    <RouterContext.Provider value={mockRouterValue}>
      {children}
    </RouterContext.Provider>
  );
}

// Default export for use in Astro components
export default function MarketingRouterProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <RouterProvider>{children}</RouterProvider>;
}