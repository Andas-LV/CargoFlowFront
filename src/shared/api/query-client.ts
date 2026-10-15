import { QueryClient } from "@tanstack/react-query";
import { isApiError } from "./api-error";

const MAX_QUERY_RETRIES = 2;

const isClientError = (error: unknown) =>
	isApiError(error) && error.status >= 400 && error.status < 500;

export const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30_000,
				retry: (failureCount, error) =>
					failureCount < MAX_QUERY_RETRIES && !isClientError(error),
			},
			mutations: {
				retry: false,
			},
		},
	});
