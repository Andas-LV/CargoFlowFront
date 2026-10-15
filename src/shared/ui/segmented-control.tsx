import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";

export interface SegmentedControlItem {
	href: string;
	label: string;
	icon?: LucideIcon;
	isActive: boolean;
}

interface SegmentedControlProps {
	items: readonly SegmentedControlItem[];
	"aria-label": string;
	className?: string;
}

function SegmentedControl({
	items,
	className,
	...props
}: SegmentedControlProps) {
	return (
		<nav
			{...props}
			className={cn("bg-muted inline-flex rounded-lg p-1", className)}
		>
			{items.map(({ href, label, icon: Icon, isActive }) => (
				<Link
					key={href}
					href={href}
					scroll={false}
					aria-current={isActive ? "page" : undefined}
					className={cn(
						"text-muted-foreground hover:text-foreground inline-flex h-7 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors",
						isActive && "bg-background text-foreground shadow-sm",
					)}
				>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			))}
		</nav>
	);
}

export { SegmentedControl };
