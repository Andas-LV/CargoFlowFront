import type { ReactNode } from "react";

import { ThemeToggle } from "@/features/toggle-theme";
import { Logo } from "@/shared/ui/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex min-h-dvh flex-col items-center justify-center gap-8 px-4 py-12">
			<div
				aria-hidden
				className="from-muted/80 pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b to-transparent"
			/>
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>
			<Logo className="text-lg" />
			<main className="w-full max-w-sm">{children}</main>
		</div>
	);
}
