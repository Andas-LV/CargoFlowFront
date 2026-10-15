import { queryOptions } from "@tanstack/react-query";
import { stationApi } from "./station-api";

const STATION_DIRECTORY_STALE_TIME = 60 * 60 * 1000;

export const stationQueries = {
	all: () => ["stations"] as const,

	search: (query: string) =>
		queryOptions({
			queryKey: [...stationQueries.all(), "search", query] as const,
			queryFn: () => stationApi.search(query),
			staleTime: STATION_DIRECTORY_STALE_TIME,
			enabled: query.length > 0,
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: [...stationQueries.all(), "detail", id] as const,
			queryFn: () => stationApi.get(id),
			staleTime: STATION_DIRECTORY_STALE_TIME,
		}),
};
