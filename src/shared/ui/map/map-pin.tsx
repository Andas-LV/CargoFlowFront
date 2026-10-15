import { Flag, TrainFront } from "lucide-react";
import type { CSSProperties } from "react";

import { cn } from "@/shared/lib/utils";

type MapPinVariant = "start" | "end" | "current" | "waypoint";

interface MapPinProps {
	variant: MapPinVariant;
	color: string;
	label?: string;
	title?: string;
	isPulsing?: boolean;
}

const PIN_SHAPE: Record<MapPinVariant, string> = {
	start: "size-4 border-[3px] border-(--pin) bg-background",
	end: "size-7 bg-(--pin) text-white ring-2 ring-background",
	current: "size-8 bg-(--pin) text-white ring-2 ring-background",
	waypoint: "size-3 bg-(--pin) ring-2 ring-background",
};

export function MapPin({
	variant,
	color,
	label,
	title,
	isPulsing,
}: MapPinProps) {
	return (
		<span
			title={title ?? label}
			style={{ "--pin": color } as CSSProperties}
			className="relative flex items-center justify-center"
		>
			{isPulsing && (
				<span className="absolute inset-0 animate-ping rounded-full bg-(--pin) opacity-60" />
			)}
			<span
				className={cn(
					"relative flex items-center justify-center rounded-full shadow-md",
					PIN_SHAPE[variant],
				)}
			>
				{variant === "end" && <Flag className="size-3.5" />}
				{variant === "current" && <TrainFront className="size-4" />}
			</span>
			{label && (
				<span className="bg-background/90 text-foreground pointer-events-none absolute top-full left-1/2 mt-1.5 -translate-x-1/2 rounded-md px-1.5 py-0.5 text-[11px] font-semibold whitespace-nowrap shadow-sm backdrop-blur">
					{label}
				</span>
			)}
		</span>
	);
}
