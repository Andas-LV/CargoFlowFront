import type { Position } from "@/entities/position";
import { ShipmentStatus, type Shipment } from "@/entities/shipment";
import {
	getBounds,
	isSameLngLat,
	toLngLat,
	type LngLat,
	type LngLatBounds,
} from "@/shared/lib/geo";

export interface RouteGeometry {
	origin: LngLat;
	destination: LngLat;
	traveled: LngLat[];
	remaining: LngLat[];
	current: LngLat;
	waypoints: Position[];
	currentPosition: Position | null;
	isActive: boolean;
	bounds: LngLatBounds | null;
}

export const buildRouteGeometry = (
	shipment: Shipment,
	positions: readonly Position[],
): RouteGeometry => {
	const origin = toLngLat(shipment.originStation);
	const destination = toLngLat(shipment.destinationStation);
	const isActive =
		shipment.status === ShipmentStatus.Created ||
		shipment.status === ShipmentStatus.InTransit;

	const visited = positions.length > 0 ? positions.map(toLngLat) : [origin];
	const current = visited[visited.length - 1];
	const isAtDestination = isSameLngLat(current, destination);

	const traveled =
		shipment.status === ShipmentStatus.Delivered && !isAtDestination
			? [...visited, destination]
			: visited;
	const remaining = isActive && !isAtDestination ? [current, destination] : [];

	const currentPosition = isActive ? (positions.at(-1) ?? null) : null;
	const waypoints = positions
		.slice(1)
		.filter((position) => position !== currentPosition);

	return {
		origin,
		destination,
		traveled,
		remaining,
		current,
		waypoints,
		currentPosition,
		isActive,
		bounds: getBounds([origin, destination, ...visited]),
	};
};

export const toLineFeature = (coordinates: LngLat[]) => ({
	type: "Feature" as const,
	properties: {},
	geometry: { type: "LineString" as const, coordinates },
});
