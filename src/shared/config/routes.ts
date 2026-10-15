export const routes = {
	home: "/",
	login: "/login",
	register: "/register",
	shipments: "/shipments",
	newShipment: "/shipments/new",
	shipment: (id: string) => `/shipments/${id}`,
	settings: "/settings",
} as const;

export const guestOnlyRoutes: readonly string[] = [
	routes.login,
	routes.register,
];

export const REDIRECT_PARAM = "from";
