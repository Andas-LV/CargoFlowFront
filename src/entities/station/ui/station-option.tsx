import { MapPin, TrainTrack } from "lucide-react";

import { formatStationMeta, getStationName } from "../model/station";
import { StationKind, type Station } from "../model/types";

export function StationOption({ station }: { station: Station }) {
	const Icon = station.kind === StationKind.Halt ? MapPin : TrainTrack;

	return (
		<span className="flex items-center gap-3">
			<Icon className="text-muted-foreground size-4 shrink-0" />
			<span className="flex min-w-0 flex-col">
				<span className="truncate">{getStationName(station)}</span>
				<span className="text-muted-foreground truncate text-xs">
					{formatStationMeta(station)}
				</span>
			</span>
		</span>
	);
}
