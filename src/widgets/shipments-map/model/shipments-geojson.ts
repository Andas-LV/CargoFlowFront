import { SHIPMENT_STATUS_COLOR, type Shipment } from "@/entities/shipment";
import { getStationName, type Station } from "@/entities/station";
import { buildArc, getBounds, toLngLat } from "@/shared/lib/geo";

export const buildRoutesCollection = (shipments: readonly Shipment[]) => ({
	type: "FeatureCollection" as const,
	features: shipments.map((shipment) => {
		const arc = buildArc(
			toLngLat(shipment.originStation),
			toLngLat(shipment.destinationStation),
		);
		const [midLng, midLat] = arc[Math.floor(arc.length / 2)];

		return {
			type: "Feature" as const,
			properties: {
				id: shipment.id,
				color: SHIPMENT_STATUS_COLOR[shipment.status],
				midLng,
				midLat,
			},
			geometry: { type: "LineString" as const, coordinates: arc },
		};
	}),
});

export const buildStationsCollection = (shipments: readonly Shipment[]) => {
	const stations = new Map<string, Station>();
	shipments.forEach(({ originStation, destinationStation }) => {
		stations.set(originStation.id, originStation);
		stations.set(destinationStation.id, destinationStation);
	});

	return {
		type: "FeatureCollection" as const,
		features: [...stations.values()].map((station) => ({
			type: "Feature" as const,
			properties: { id: station.id, name: getStationName(station) },
			geometry: { type: "Point" as const, coordinates: toLngLat(station) },
		})),
	};
};

export const getShipmentsBounds = (shipments: readonly Shipment[]) =>
	getBounds(
		shipments.flatMap(({ originStation, destinationStation }) => [
			toLngLat(originStation),
			toLngLat(destinationStation),
		]),
	);
