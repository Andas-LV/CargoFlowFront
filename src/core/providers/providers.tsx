"use client";

import type { ReactNode } from "react";

import { Toaster } from "@/shared/ui/sonner";
import { QueryProvider } from "./query-provider";
import { SessionExpiryListener } from "./session-expiry-listener";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<QueryProvider>
				{children}
				<SessionExpiryListener />
				<Toaster position="top-right" richColors closeButton />
			</QueryProvider>
		</ThemeProvider>
	);
}
