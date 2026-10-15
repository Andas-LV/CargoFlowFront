import { MapPin } from "lucide-react";

import { formatDateTime } from "@/shared/lib/date";
import { cn } from "@/shared/lib/utils";
import {
	formatCoordinates,
	getPositionSourceLabel,
	hasCoordinates,
} from "../model/position";
import type { Position } from "../model/types";

interface RouteTimelineProps {
	positions: Position[];
	className?: string;
}

export function RouteTimeline({ positions, className }: RouteTimelineProps) {
	const lastIndex = positions.length - 1;

	return (
		<ol className={cn("flex flex-col", className)}>
			{positions.map((position, index) => {
				const isLatest = index === lastIndex;

				return (
					<li key={position.id} className="relative flex gap-4 pb-6 last:pb-0">
						{!isLatest && (
							<span
								aria-hidden
								className="bg-border absolute top-7 bottom-0 left-[11px] w-px"
							/>
						)}
						<span
							className={cn(
								"relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border",
								isLatest
									? "bg-primary border-primary text-primary-foreground"
									: "bg-background text-muted-foreground",
							)}
						>
							<MapPin className="size-3.5" />
						</span>
						<div className="flex min-w-0 flex-1 flex-col gap-0.5">
							<div className="flex flex-wrap items-baseline justify-between gap-x-3">
								<span className="truncate font-medium">{position.station}</span>
								<time
									dateTime={position.recordedAt}
									className="text-muted-foreground text-xs whitespace-nowrap"
								>
									{formatDateTime(position.recordedAt)}
								</time>
							</div>
							<span className="text-muted-foreground flex flex-wrap gap-x-2 text-xs">
								<span>{getPositionSourceLabel(position.source)}</span>
								{hasCoordinates(position) && (
									<>
										<span aria-hidden>·</span>
										<span className="font-mono">
											{formatCoordinates(position)}
										</span>
									</>
								)}
							</span>
						</div>
					</li>
				);
			})}
		</ol>
	);
}
