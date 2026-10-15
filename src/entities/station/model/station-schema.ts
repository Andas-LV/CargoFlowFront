import { z } from "zod";
import type { Station } from "./types";

export const requiredStationSchema = (message: string) =>
	z
		.custom<Station | null>()
		.refine((station): station is Station => station != null, message);
