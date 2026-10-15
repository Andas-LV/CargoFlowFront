export const ShipmentsView = {
	List: "list",
	Map: "map",
} as const;

export type ShipmentsView = (typeof ShipmentsView)[keyof typeof ShipmentsView];

export const parseShipmentsView = (value: unknown): ShipmentsView =>
	value === ShipmentsView.Map ? ShipmentsView.Map : ShipmentsView.List;
