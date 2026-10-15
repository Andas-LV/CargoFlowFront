export const StationKind = {
	Station: "STATION_KIND_STATION",
	Halt: "STATION_KIND_HALT",
} as const;

export type StationKind = (typeof StationKind)[keyof typeof StationKind];

export interface Station {
	id: string;
	esr: string;
	kind: StationKind;
	name: string;
	nameRu: string;
	nameKk: string;
	nameEn: string;
	lat: number;
	lon: number;
}
