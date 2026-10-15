import { z } from "zod";

import { CargoType, type CreateShipmentPayload } from "@/entities/shipment";
import { requiredStationSchema } from "@/entities/station";

export const createShipmentSchema = z
	.object({
		cargoType: z.nativeEnum(CargoType, {
			errorMap: () => ({ message: "Выберите тип груза" }),
		}),
		origin: requiredStationSchema("Выберите станцию отправления"),
		destination: requiredStationSchema("Выберите станцию назначения"),
	})
	.refine(({ origin, destination }) => origin.id !== destination.id, {
		path: ["destination"],
		message: "Станции отправления и назначения не должны совпадать",
	});

export type CreateShipmentFormInput = z.input<typeof createShipmentSchema>;
export type CreateShipmentFormValues = z.output<typeof createShipmentSchema>;

export const CREATE_SHIPMENT_DEFAULTS: CreateShipmentFormInput = {
	cargoType: CargoType.Wagon,
	origin: null,
	destination: null,
};

export const toCreateShipmentPayload = ({
	cargoType,
	origin,
	destination,
}: CreateShipmentFormValues): CreateShipmentPayload => ({
	cargoType,
	originStationId: origin.id,
	destinationStationId: destination.id,
});
