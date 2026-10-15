import axios, { type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/shared/config";
import { ApiError, isApiError, toApiError } from "./api-error";
import { sessionEvents } from "./session-events";
import { tokenStorage, type TokenPair } from "./token-storage";

type RetriableRequestConfig = InternalAxiosRequestConfig & {
	_isRetry?: boolean;
};

const createClient = () =>
	axios.create({
		baseURL: API_BASE_URL,
		headers: { "Content-Type": "application/json" },
	});

const rejectWithApiError = (error: unknown) =>
	Promise.reject(toApiError(error));

export const publicHttp = createClient();
export const http = createClient();

publicHttp.interceptors.response.use(undefined, rejectWithApiError);

const endSession = () => {
	tokenStorage.clear();
	sessionEvents.emitExpired();
};

const requestTokenRefresh = async () => {
	const refreshToken = tokenStorage.getRefreshToken();
	if (!refreshToken) throw new ApiError(401, "missing refresh token");

	const { data } = await publicHttp.post<{ tokens: TokenPair }>(
		"/v1/auth/refresh",
		{ refreshToken },
	);
	tokenStorage.save(data.tokens);
	return data.tokens.accessToken;
};

let refreshInFlight: Promise<string> | null = null;

export const refreshAccessToken = () => {
	refreshInFlight ??= requestTokenRefresh()
		.catch((error: unknown) => {
			if (isApiError(error, 400, 401)) endSession();
			throw error;
		})
		.finally(() => {
			refreshInFlight = null;
		});

	return refreshInFlight;
};

const bearer = (token: string) => `Bearer ${token}`;

http.interceptors.request.use(async (config) => {
	const accessToken =
		tokenStorage.getAccessToken() ?? (await refreshAccessToken());
	config.headers.Authorization = bearer(accessToken);
	return config;
});

http.interceptors.response.use(undefined, async (error: unknown) => {
	if (
		!axios.isAxiosError(error) ||
		error.response?.status !== 401 ||
		!error.config
	) {
		return rejectWithApiError(error);
	}

	const config = error.config as RetriableRequestConfig;
	if (config._isRetry) {
		endSession();
		return rejectWithApiError(error);
	}

	config._isRetry = true;
	const currentToken = tokenStorage.getAccessToken();
	const isTokenRotated =
		currentToken && bearer(currentToken) !== config.headers.Authorization;
	if (!isTokenRotated) await refreshAccessToken();

	return http(config);
});
