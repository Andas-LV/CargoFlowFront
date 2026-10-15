import { AUTH_COOKIES, REFRESH_TOKEN_TTL_DAYS } from "@/shared/config";
import { cookie } from "@/shared/lib/cookie";

export interface TokenPair {
	accessToken: string;
	refreshToken: string;
	expiresIn: string;
}

export const tokenStorage = {
	getAccessToken: () => cookie.get(AUTH_COOKIES.accessToken),
	getRefreshToken: () => cookie.get(AUTH_COOKIES.refreshToken),
	save: ({ accessToken, refreshToken, expiresIn }: TokenPair) => {
		cookie.set(
			AUTH_COOKIES.accessToken,
			accessToken,
			new Date(Date.now() + Number(expiresIn) * 1000),
		);
		cookie.set(AUTH_COOKIES.refreshToken, refreshToken, REFRESH_TOKEN_TTL_DAYS);
	},
	clear: () => {
		cookie.remove(AUTH_COOKIES.accessToken);
		cookie.remove(AUTH_COOKIES.refreshToken);
	},
};
