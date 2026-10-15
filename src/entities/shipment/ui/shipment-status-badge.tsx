import type { VariantProps } from "class-variance-authority";

import { Badge, type badgeVariants } from "@/shared/ui/badge";
import { SHIPMENT_STATUS_LABEL } from "../model/status";
import { ShipmentStatus } from "../model/types";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const STATUS_VARIANT: Record<ShipmentStatus, BadgeVariant> = {
	[ShipmentStatus.Created]: "info",
	[ShipmentStatus.InTransit]: "warning",
	[ShipmentStatus.Delivered]: "success",
	[ShipmentStatus.Cancelled]: "muted",
};

interface ShipmentStatusBadgeProps {
	status: ShipmentStatus;
	className?: string;
}

export function ShipmentStatusBadge({
	status,
	className,
}: ShipmentStatusBadgeProps) {
	return (
		<Badge variant={STATUS_VARIANT[status]} className={className}>
			<span className="size-1.5 rounded-full bg-current" />
			{SHIPMENT_STATUS_LABEL[status]}
		</Badge>
	);
}
