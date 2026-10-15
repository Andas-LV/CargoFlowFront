import axios from "axios";

export interface ApiErrorBody {
	code: number;
	message: string;
	details: unknown[];
}

export class ApiError extends Error {
	constructor(
		readonly status: number,
		message: string,
		readonly code?: number,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export const toApiError = (error: unknown): ApiError => {
	if (error instanceof ApiError) return error;

	if (axios.isAxiosError<Partial<ApiErrorBody>>(error)) {
		const body = error.response?.data;
		return new ApiError(
			error.response?.status ?? 0,
			body?.message ?? error.message,
			body?.code,
		);
	}

	return new ApiError(
		0,
		error instanceof Error ? error.message : String(error),
	);
};

export const isApiError = (
	error: unknown,
	...statuses: number[]
): error is ApiError =>
	error instanceof ApiError &&
	(statuses.length === 0 || statuses.includes(error.status));
