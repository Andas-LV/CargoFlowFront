import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
	icon: LucideIcon;
	title: ReactNode;
	description?: ReactNode;
	action?: ReactNode;
	className?: string;
}

function EmptyState({
	icon: Icon,
	title,
	description,
	action,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center",
				className,
			)}
		>
			<div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
				<Icon className="size-6" />
			</div>
			<div className="flex max-w-sm flex-col gap-1">
				<h3 className="font-medium">{title}</h3>
				{description && (
					<p className="text-muted-foreground text-sm">{description}</p>
				)}
			</div>
			{action && <div className="mt-2">{action}</div>}
		</div>
	);
}

export { EmptyState };
