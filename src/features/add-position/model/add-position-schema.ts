import { z } from "zod";

const STATION_MAX_LENGTH = 100;

const coordinateSchema = (min: number, max: number, label: string) =>
	z
		.string()
		.trim()
		.transform((value) =>
			value === "" ? undefined : Number(value.replace(",", ".")),
		)
		.refine(
			(value) =>
				value === undefined ||
				(Number.isFinite(value) && value >= min && value <= max),
			`${label}: число от ${min} до ${max}`,
		);

export const addPositionSchema = z
	.object({
		station: z
			.string()
			.trim()
			.min(1, "Укажите станцию")
			.max(STATION_MAX_LENGTH, `Не длиннее ${STATION_MAX_LENGTH} символов`),
		lat: coordinateSchema(-90, 90, "Широта"),
		lon: coordinateSchema(-180, 180, "Долгота"),
	})
	.refine(({ lat, lon }) => (lat === undefined) === (lon === undefined), {
		path: ["lon"],
		message: "Укажите обе координаты или оставьте обе пустыми",
	});

export type AddPositionFormInput = z.input<typeof addPositionSchema>;
export type AddPositionFormValues = z.output<typeof addPositionSchema>;

export const ADD_POSITION_DEFAULTS: AddPositionFormInput = {
	station: "",
	lat: "",
	lon: "",
};
