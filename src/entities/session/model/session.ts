import { tokenStorage, type TokenPair } from "@/shared/api";
import { AUTH_COOKIES, REFRESH_TOKEN_TTL_DAYS } from "@/shared/config";
import { cookie } from "@/shared/lib/cookie";

export const startSession = (tokens: TokenPair, email: string) => {
	tokenStorage.save(tokens);
	cookie.set(AUTH_COOKIES.email, email, REFRESH_TOKEN_TTL_DAYS);
};

export const clearSession = () => {
	tokenStorage.clear();
	cookie.remove(AUTH_COOKIES.email);
};
