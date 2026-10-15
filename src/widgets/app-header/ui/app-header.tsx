"use client";

import { Package, Settings, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/features/toggle-theme";
import { routes } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";
import { UserMenu } from "./user-menu";

interface NavItem {
	href: string;
	label: string;
	icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
	{ href: routes.shipments, label: "Заявки", icon: Package },
	{ href: routes.settings, label: "Настройки", icon: Settings },
];

interface AppHeaderProps {
	email?: string;
}

export function AppHeader({ email }: AppHeaderProps) {
	const pathname = usePathname();

	return (
		<header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
			<Container className="flex h-16 items-center gap-2 sm:gap-6">
				<Link href={routes.shipments} aria-label="На главную">
					<Logo />
				</Link>
				<nav className="flex items-center gap-1">
					{NAV_ITEMS.map(({ href, label, icon: Icon }) => {
						const isActive = pathname.startsWith(href);

						return (
							<Link
								key={href}
								href={href}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"text-muted-foreground hover:text-foreground hover:bg-accent/60 inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
									isActive && "bg-accent text-foreground",
								)}
							>
								<Icon className="size-4" />
								<span className="hidden sm:inline">{label}</span>
							</Link>
						);
					})}
				</nav>
				<div className="ml-auto flex items-center gap-1">
					<ThemeToggle />
					<UserMenu email={email} />
				</div>
			</Container>
		</header>
	);
}
