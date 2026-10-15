export const PositionSource = {
	Manual: "manual",
	ShipmentCreated: "shipment.created",
} as const;

export type PositionSource =
	(typeof PositionSource)[keyof typeof PositionSource];

export interface Position {
	id: string;
	shipmentId: string;
	station: string;
	lat: number;
	lon: number;
	source: PositionSource | (string & {});
	recordedAt: string;
}

export interface AddPositionPayload {
	station: string;
	lat?: number;
	lon?: number;
}
