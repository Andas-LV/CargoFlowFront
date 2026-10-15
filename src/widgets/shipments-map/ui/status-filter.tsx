import type { CSSProperties } from "react";

import {
	SHIPMENT_STATUS_COLOR,
	SHIPMENT_STATUS_LABEL,
	ShipmentStatus,
} from "@/entities/shipment";
import { cn } from "@/shared/lib/utils";

const STATUSES = Object.values(ShipmentStatus);

interface StatusFilterProps {
	counts: Record<ShipmentStatus, number>;
	hiddenStatuses: ReadonlySet<ShipmentStatus>;
	onToggle: (status: ShipmentStatus) => void;
}

export function StatusFilter({
	counts,
	hiddenStatuses,
	onToggle,
}: StatusFilterProps) {
	return (
		<div
			role="group"
			aria-label="Фильтр по статусу"
			className="bg-background/90 flex flex-col gap-0.5 rounded-lg border p-1.5 shadow-sm backdrop-blur"
		>
			{STATUSES.map((status) => {
				const isVisible = !hiddenStatuses.has(status);

				return (
					<button
						key={status}
						type="button"
						aria-pressed={isVisible}
						disabled={counts[status] === 0}
						onClick={() => onToggle(status)}
						style={
							{ "--status": SHIPMENT_STATUS_COLOR[status] } as CSSProperties
						}
						className={cn(
							"hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-colors disabled:pointer-events-none disabled:opacity-40",
							!isVisible && "text-muted-foreground",
						)}
					>
						<span
							className={cn(
								"h-1 w-4 rounded-full transition-opacity",
								isVisible ? "bg-(--status)" : "bg-muted-foreground/40",
							)}
						/>
						<span className="flex-1">{SHIPMENT_STATUS_LABEL[status]}</span>
						<span className="text-muted-foreground tabular-nums">
							{counts[status]}
						</span>
					</button>
				);
			})}
		</div>
	);
}
