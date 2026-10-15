import { Container, TrainFrontTunnel, type LucideIcon } from "lucide-react";
import { CargoType } from "./types";

interface CargoTypeMeta {
	label: string;
	description: string;
	icon: LucideIcon;
}

export const CARGO_TYPE_META: Record<CargoType, CargoTypeMeta> = {
	[CargoType.Wagon]: {
		label: "Вагон",
		description: "Перевозка целым вагоном",
		icon: TrainFrontTunnel,
	},
	[CargoType.Container]: {
		label: "Контейнер",
		description: "Перевозка в контейнере",
		icon: Container,
	},
};

export const CARGO_TYPES = Object.values(CargoType);
