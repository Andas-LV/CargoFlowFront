import { ArrowRight } from "lucide-react";

import { getStationName } from "@/entities/station/@x/shipment";
import { cn } from "@/shared/lib/utils";
import type { Shipment } from "../model/types";

interface ShipmentDirectionProps {
	shipment: Pick<Shipment, "originStation" | "destinationStation">;
	className?: string;
}

export function ShipmentDirection({
	shipment,
	className,
}: ShipmentDirectionProps) {
	return (
		<span className={cn("inline-flex min-w-0 items-center gap-2", className)}>
			<span className="truncate">{getStationName(shipment.originStation)}</span>
			<ArrowRight className="text-muted-foreground size-4 shrink-0" />
			<span className="truncate">
				{getStationName(shipment.destinationStation)}
			</span>
		</span>
	);
}
