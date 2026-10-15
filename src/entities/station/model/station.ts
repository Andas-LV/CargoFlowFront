import { StationKind, type Station } from "./types";

const STATION_KIND_LABEL: Record<StationKind, string> = {
	[StationKind.Station]: "Станция",
	[StationKind.Halt]: "Остановочный пункт",
};

export const getStationKindLabel = (kind: StationKind) =>
	STATION_KIND_LABEL[kind] ?? STATION_KIND_LABEL[StationKind.Station];

export const getStationName = (station: Pick<Station, "nameRu" | "name">) =>
	station.nameRu || station.name;

export const formatStationMeta = (station: Pick<Station, "kind" | "esr">) =>
	[getStationKindLabel(station.kind), station.esr && `ЕСР ${station.esr}`]
		.filter(Boolean)
		.join(" · ");
