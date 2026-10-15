"use client";

import { getAvailableTransitions, type Shipment } from "@/entities/shipment";
import { cn } from "@/shared/lib/utils";
import { TRANSITION_ACTIONS } from "../model/transition-actions";
import { useChangeShipmentStatus } from "../model/use-change-shipment-status";
import { TransitionButton } from "./transition-button";

interface ChangeStatusActionsProps {
	shipment: Shipment;
	className?: string;
}

export function ChangeStatusActions({
	shipment,
	className,
}: ChangeStatusActionsProps) {
	const changeStatus = useChangeShipmentStatus(shipment.id);

	const actions = getAvailableTransitions(shipment.status).flatMap((status) => {
		const action = TRANSITION_ACTIONS[status];
		return action ? [{ status, action }] : [];
	});

	if (actions.length === 0) return null;

	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{actions.map(({ status, action }) => (
				<TransitionButton
					key={status}
					action={action}
					isPending={
						changeStatus.isPending && changeStatus.variables === status
					}
					disabled={changeStatus.isPending}
					onConfirm={() => changeStatus.mutate(status)}
				/>
			))}
		</div>
	);
}
