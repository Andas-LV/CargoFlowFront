import { z } from "zod";
import { CargoType } from "@/entities/shipment";

const STATION_MAX_LENGTH = 100;

const stationSchema = (requiredMessage: string) =>
	z
		.string()
		.trim()
		.min(1, requiredMessage)
		.max(STATION_MAX_LENGTH, `Не длиннее ${STATION_MAX_LENGTH} символов`);

export const createShipmentSchema = z
	.object({
		cargoType: z.nativeEnum(CargoType, {
			errorMap: () => ({ message: "Выберите тип груза" }),
		}),
		origin: stationSchema("Укажите станцию отправления"),
		destination: stationSchema("Укажите станцию назначения"),
	})
	.refine(
		({ origin, destination }) =>
			origin.toLowerCase() !== destination.toLowerCase(),
		{
			path: ["destination"],
			message: "Станции отправления и назначения не должны совпадать",
		},
	);

export type CreateShipmentFormValues = z.infer<typeof createShipmentSchema>;
