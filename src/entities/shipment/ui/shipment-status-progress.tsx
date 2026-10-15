import { Check, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { SHIPMENT_STATUS_FLOW, SHIPMENT_STATUS_LABEL } from "../model/status";
import { ShipmentStatus } from "../model/types";

interface ShipmentStatusProgressProps {
	status: ShipmentStatus;
	className?: string;
}

export function ShipmentStatusProgress({
	status,
	className,
}: ShipmentStatusProgressProps) {
	if (status === ShipmentStatus.Cancelled) {
		return (
			<div
				className={cn(
					"bg-muted text-muted-foreground flex items-center gap-3 rounded-lg px-4 py-3 text-sm",
					className,
				)}
			>
				<span className="bg-background flex size-6 items-center justify-center rounded-full border">
					<X className="size-3.5" />
				</span>
				Заявка отменена, дальнейшие действия недоступны
			</div>
		);
	}

	const currentIndex = SHIPMENT_STATUS_FLOW.indexOf(status);

	return (
		<ol className={cn("flex items-center gap-2", className)}>
			{SHIPMENT_STATUS_FLOW.map((step, index) => {
				const isDone =
					index < currentIndex || status === ShipmentStatus.Delivered;
				const isCurrent = index === currentIndex;

				return (
					<li
						key={step}
						className="flex flex-1 items-center gap-2 last:flex-none"
						aria-current={isCurrent ? "step" : undefined}
					>
						<span className="flex items-center gap-2">
							<span
								className={cn(
									"flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors",
									isDone && "bg-primary border-primary text-primary-foreground",
									isCurrent &&
										!isDone &&
										"border-primary text-primary ring-primary/20 ring-4",
									!isDone && !isCurrent && "text-muted-foreground",
								)}
							>
								{isDone ? <Check className="size-3.5" /> : index + 1}
							</span>
							<span
								className={cn(
									"text-sm whitespace-nowrap",
									isCurrent ? "font-medium" : "text-muted-foreground",
								)}
							>
								{SHIPMENT_STATUS_LABEL[step]}
							</span>
						</span>
						{index < SHIPMENT_STATUS_FLOW.length - 1 && (
							<span
								className={cn(
									"h-px flex-1",
									index < currentIndex ? "bg-primary" : "bg-border",
								)}
							/>
						)}
					</li>
				);
			})}
		</ol>
	);
}
