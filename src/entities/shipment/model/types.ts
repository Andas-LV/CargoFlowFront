export const CargoType = {
	Wagon: "CARGO_TYPE_WAGON",
	Container: "CARGO_TYPE_CONTAINER",
} as const;

export type CargoType = (typeof CargoType)[keyof typeof CargoType];

export const ShipmentStatus = {
	Created: "SHIPMENT_STATUS_CREATED",
	InTransit: "SHIPMENT_STATUS_IN_TRANSIT",
	Delivered: "SHIPMENT_STATUS_DELIVERED",
	Cancelled: "SHIPMENT_STATUS_CANCELLED",
} as const;

export type ShipmentStatus =
	(typeof ShipmentStatus)[keyof typeof ShipmentStatus];

export interface Shipment {
	id: string;
	ownerId: string;
	cargoType: CargoType;
	origin: string;
	destination: string;
	status: ShipmentStatus;
	createdAt: string;
	updatedAt: string;
}

export interface CreateShipmentPayload {
	cargoType: CargoType;
	origin: string;
	destination: string;
}
