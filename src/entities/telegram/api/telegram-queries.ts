import { queryOptions } from "@tanstack/react-query";
import { telegramApi } from "./telegram-api";

export const telegramQueries = {
	all: () => ["telegram"] as const,

	status: () =>
		queryOptions({
			queryKey: [...telegramQueries.all(), "status"] as const,
			queryFn: telegramApi.getStatus,
			refetchOnWindowFocus: "always",
		}),
};
