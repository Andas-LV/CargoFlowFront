import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface PageHeaderProps {
	title: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
	eyebrow?: ReactNode;
	className?: string;
}

function PageHeader({
	title,
	description,
	actions,
	eyebrow,
	className,
}: PageHeaderProps) {
	return (
		<header
			className={cn(
				"flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				className,
			)}
		>
			<div className="flex min-w-0 flex-col gap-1.5">
				{eyebrow}
				<h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
					{title}
				</h1>
				{description && (
					<p className="text-muted-foreground text-sm">{description}</p>
				)}
			</div>
			{actions && <div className="flex shrink-0 gap-2">{actions}</div>}
		</header>
	);
}

export { PageHeader };
