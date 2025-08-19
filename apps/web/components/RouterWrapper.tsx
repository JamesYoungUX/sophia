import React from 'react';
import { RouterProvider } from '../lib/router-provider';

// This component wraps any UI components that might use router hooks
export default function RouterWrapper({ children }: { children: React.ReactNode }) {
  return <RouterProvider>{children}</RouterProvider>;
}