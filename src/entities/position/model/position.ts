import { PositionSource, type Position } from "./types";

const POSITION_SOURCE_LABEL: Record<PositionSource, string> = {
	[PositionSource.Manual]: "Отмечено вручную",
	[PositionSource.ShipmentCreated]: "Станция отправления",
};

export const getPositionSourceLabel = (source: Position["source"]) =>
	POSITION_SOURCE_LABEL[source as PositionSource] ?? "Событие системы";

export const hasCoordinates = ({ lat, lon }: Pick<Position, "lat" | "lon">) =>
	Boolean(lat || lon);

export const formatCoordinates = ({
	lat,
	lon,
}: Pick<Position, "lat" | "lon">) => `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
