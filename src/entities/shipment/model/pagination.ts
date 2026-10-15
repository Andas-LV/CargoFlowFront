export const SHIPMENTS_PAGE_SIZES = [20, 50, 100] as const;

export type ShipmentsPageSize = (typeof SHIPMENTS_PAGE_SIZES)[number];

export const DEFAULT_SHIPMENTS_PAGE_SIZE: ShipmentsPageSize = 20;
