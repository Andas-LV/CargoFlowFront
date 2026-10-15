import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { formatDateTime } from "@/shared/lib/date";
import { shortId } from "@/shared/lib/short-id";
import { CARGO_TYPE_META } from "../model/cargo-type";
import type { Shipment } from "../model/types";
import { CargoTypeIcon } from "./cargo-type-icon";
import { ShipmentDirection } from "./shipment-direction";
import { ShipmentStatusBadge } from "./shipment-status-badge";

interface ShipmentCardProps {
	shipment: Shipment;
	href: string;
}

export function ShipmentCard({ shipment, href }: ShipmentCardProps) {
	return (
		<Link
			href={href}
			className="group bg-card hover:border-foreground/20 focus-visible:ring-ring/50 flex items-center gap-4 rounded-xl border p-4 shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
		>
			<CargoTypeIcon cargoType={shipment.cargoType} />
			<div className="flex min-w-0 flex-1 flex-col gap-1">
				<ShipmentDirection shipment={shipment} className="font-medium" />
				<span className="text-muted-foreground flex flex-wrap items-center gap-x-2 text-xs">
					<span className="font-mono">#{shortId(shipment.id)}</span>
					<span aria-hidden>·</span>
					<span>{CARGO_TYPE_META[shipment.cargoType].label}</span>
					<span aria-hidden>·</span>
					<time dateTime={shipment.createdAt}>
						{formatDateTime(shipment.createdAt)}
					</time>
				</span>
				<ShipmentStatusBadge
					status={shipment.status}
					className="mt-1 sm:hidden"
				/>
			</div>
			<ShipmentStatusBadge
				status={shipment.status}
				className="hidden sm:inline-flex"
			/>
			<ChevronRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
		</Link>
	);
}
