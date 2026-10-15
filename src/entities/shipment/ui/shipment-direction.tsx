import { ArrowRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface ShipmentDirectionProps {
	origin: string;
	destination: string;
	className?: string;
}

export function ShipmentDirection({
	origin,
	destination,
	className,
}: ShipmentDirectionProps) {
	return (
		<span className={cn("inline-flex min-w-0 items-center gap-2", className)}>
			<span className="truncate">{origin}</span>
			<ArrowRight className="text-muted-foreground size-4 shrink-0" />
			<span className="truncate">{destination}</span>
		</span>
	);
}
