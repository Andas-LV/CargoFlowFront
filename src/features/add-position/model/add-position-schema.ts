import { z } from "zod";

import type { AddPositionPayload } from "@/entities/position";
import { requiredStationSchema } from "@/entities/station";

export const addPositionSchema = z.object({
	station: requiredStationSchema("Выберите станцию"),
});

export type AddPositionFormInput = z.input<typeof addPositionSchema>;
export type AddPositionFormValues = z.output<typeof addPositionSchema>;

export const ADD_POSITION_DEFAULTS: AddPositionFormInput = {
	station: null,
};

export const toAddPositionPayload = ({
	station,
}: AddPositionFormValues): AddPositionPayload => ({ stationId: station.id });
