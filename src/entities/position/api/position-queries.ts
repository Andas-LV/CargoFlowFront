import { queryOptions } from "@tanstack/react-query";
import { positionApi } from "./position-api";

export const positionQueries = {
	all: () => ["positions"] as const,

	route: (shipmentId: string) =>
		queryOptions({
			queryKey: [...positionQueries.all(), "route", shipmentId] as const,
			queryFn: () => positionApi.getRoute(shipmentId),
		}),
};
