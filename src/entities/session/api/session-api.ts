import { publicHttp, type TokenPair } from "@/shared/api";
import type { Credentials, RegisteredUser } from "../model/types";

export const sessionApi = {
	login: async (credentials: Credentials) => {
		const { data } = await publicHttp.post<{ tokens: TokenPair }>(
			"/v1/auth/login",
			credentials,
		);
		return data.tokens;
	},

	register: async (credentials: Credentials) => {
		const { data } = await publicHttp.post<RegisteredUser>(
			"/v1/auth/register",
			credentials,
		);
		return data;
	},
};
