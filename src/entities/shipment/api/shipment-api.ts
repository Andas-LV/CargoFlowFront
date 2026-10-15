import { http } from "@/shared/api";
import type {
	CreateShipmentPayload,
	Shipment,
	ShipmentStatus,
} from "../model/types";

interface ShipmentResponse {
	shipment: Shipment;
}

interface ShipmentListResponse {
	shipments?: Shipment[];
}

export const shipmentApi = {
	list: async (params: { pageSize?: number } = {}) => {
		const { data } = await http.get<ShipmentListResponse>("/v1/shipments", {
			params,
		});
		return data.shipments ?? [];
	},

	get: async (id: string) => {
		const { data } = await http.get<ShipmentResponse>(
			`/v1/shipments/${encodeURIComponent(id)}`,
		);
		return data.shipment;
	},

	create: async (payload: CreateShipmentPayload) => {
		const { data } = await http.post<ShipmentResponse>(
			"/v1/shipments",
			payload,
		);
		return data.shipment;
	},

	updateStatus: async (id: string, status: ShipmentStatus) => {
		const { data } = await http.patch<ShipmentResponse>(
			`/v1/shipments/${encodeURIComponent(id)}/status`,
			{ status },
		);
		return data.shipment;
	},
};
