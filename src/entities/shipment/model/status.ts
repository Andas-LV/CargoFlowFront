import { ShipmentStatus } from "./types";

export const SHIPMENT_STATUS_LABEL: Record<ShipmentStatus, string> = {
	[ShipmentStatus.Created]: "Создана",
	[ShipmentStatus.InTransit]: "В пути",
	[ShipmentStatus.Delivered]: "Доставлена",
	[ShipmentStatus.Cancelled]: "Отменена",
};

const STATUS_TRANSITIONS: Record<ShipmentStatus, readonly ShipmentStatus[]> = {
	[ShipmentStatus.Created]: [
		ShipmentStatus.InTransit,
		ShipmentStatus.Cancelled,
	],
	[ShipmentStatus.InTransit]: [
		ShipmentStatus.Delivered,
		ShipmentStatus.Cancelled,
	],
	[ShipmentStatus.Delivered]: [],
	[ShipmentStatus.Cancelled]: [],
};

export const SHIPMENT_STATUS_FLOW: readonly ShipmentStatus[] = [
	ShipmentStatus.Created,
	ShipmentStatus.InTransit,
	ShipmentStatus.Delivered,
];

export const getAvailableTransitions = (status: ShipmentStatus) =>
	STATUS_TRANSITIONS[status];

export const isFinalStatus = (status: ShipmentStatus) =>
	STATUS_TRANSITIONS[status].length === 0;

export const SHIPMENT_STATUS_COLOR: Record<ShipmentStatus, string> = {
	[ShipmentStatus.Created]: "#6366f1",
	[ShipmentStatus.InTransit]: "#f59e0b",
	[ShipmentStatus.Delivered]: "#10b981",
	[ShipmentStatus.Cancelled]: "#a1a1aa",
};
