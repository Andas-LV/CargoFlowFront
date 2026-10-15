import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface BackLinkProps {
	href: string;
	children: ReactNode;
	className?: string;
}

function BackLink({ href, children, className }: BackLinkProps) {
	return (
		<Link
			href={href}
			className={cn(
				"text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-1.5 text-sm transition-colors",
				className,
			)}
		>
			<ArrowLeft className="size-4" />
			{children}
		</Link>
	);
}

export { BackLink };
