import { http } from "@/shared/api";
import type { AddPositionPayload, Position } from "../model/types";

const shipmentPath = (shipmentId: string) =>
	`/v1/shipments/${encodeURIComponent(shipmentId)}`;

export const positionApi = {
	getRoute: async (shipmentId: string) => {
		const { data } = await http.get<{ positions?: Position[] }>(
			`${shipmentPath(shipmentId)}/route`,
		);
		return data.positions ?? [];
	},

	add: async (shipmentId: string, payload: AddPositionPayload) => {
		const { data } = await http.post<{ position: Position }>(
			`${shipmentPath(shipmentId)}/positions`,
			payload,
		);
		return data.position;
	},
};
