import {
	CARGO_TYPE_META,
	ShipmentDirection,
	ShipmentStatusBadge,
	type Shipment,
} from "@/entities/shipment";
import { shortId } from "@/shared/lib/short-id";

export function ShipmentPopupContent({ shipment }: { shipment: Shipment }) {
	return (
		<div className="flex min-w-48 flex-col gap-1.5">
			<ShipmentDirection shipment={shipment} className="text-sm font-medium" />
			<div className="text-muted-foreground flex items-center gap-2 text-xs">
				<span className="font-mono">#{shortId(shipment.id)}</span>
				<span aria-hidden>·</span>
				<span>{CARGO_TYPE_META[shipment.cargoType].label}</span>
			</div>
			<ShipmentStatusBadge status={shipment.status} />
		</div>
	);
}
