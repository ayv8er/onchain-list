"use client";
import { Providers } from "./providers";

// adding this to keep layout as a server component to allow metadata export
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
};
