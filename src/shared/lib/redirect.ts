import { REDIRECT_PARAM } from "@/shared/config";

const isSafeInternalPath = (path: string | null): path is string =>
	!!path && path.startsWith("/") && !path.startsWith("//");

export const resolveRedirectPath = (fallback: string) => {
	const target = new URLSearchParams(window.location.search).get(
		REDIRECT_PARAM,
	);
	return isSafeInternalPath(target) ? target : fallback;
};
