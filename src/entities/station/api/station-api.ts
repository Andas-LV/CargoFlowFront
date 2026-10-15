import { http } from "@/shared/api";
import type { Station } from "../model/types";

export const STATION_SEARCH_PAGE_SIZE = 10;

export const stationApi = {
	search: async (query: string, pageSize = STATION_SEARCH_PAGE_SIZE) => {
		const { data } = await http.get<{ stations?: Station[] }>("/v1/stations", {
			params: { query, pageSize },
		});
		return data.stations ?? [];
	},

	get: async (id: string) => {
		const { data } = await http.get<{ station: Station }>(
			`/v1/stations/${encodeURIComponent(id)}`,
		);
		return data.station;
	},
};
