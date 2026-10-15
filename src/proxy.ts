import { NextResponse, type NextRequest } from "next/server";

import {
	AUTH_COOKIES,
	REDIRECT_PARAM,
	guestOnlyRoutes,
	routes,
} from "@/shared/config";

export function proxy(request: NextRequest) {
	const { pathname, search } = request.nextUrl;
	const hasSession = request.cookies.has(AUTH_COOKIES.refreshToken);
	const isGuestOnly = guestOnlyRoutes.some((route) =>
		pathname.startsWith(route),
	);

	if (!hasSession && !isGuestOnly) {
		const loginUrl = new URL(routes.login, request.url);
		if (pathname !== routes.home) {
			loginUrl.searchParams.set(REDIRECT_PARAM, `${pathname}${search}`);
		}
		return NextResponse.redirect(loginUrl);
	}

	if (hasSession && isGuestOnly) {
		return NextResponse.redirect(new URL(routes.shipments, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
