import { queryOptions } from "@tanstack/react-query";
import { shipmentApi } from "./shipment-api";

export const shipmentQueries = {
	all: () => ["shipments"] as const,

	lists: () => [...shipmentQueries.all(), "list"] as const,

	list: (pageSize: number) =>
		queryOptions({
			queryKey: [...shipmentQueries.lists(), { pageSize }] as const,
			queryFn: () => shipmentApi.list({ pageSize }),
		}),

	details: () => [...shipmentQueries.all(), "detail"] as const,

	detail: (id: string) =>
		queryOptions({
			queryKey: [...shipmentQueries.details(), id] as const,
			queryFn: () => shipmentApi.get(id),
		}),
};
