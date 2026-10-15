import {
	CircleX,
	PackageCheck,
	TrainFront,
	type LucideIcon,
} from "lucide-react";

import { ShipmentStatus } from "@/entities/shipment";

interface TransitionConfirmation {
	title: string;
	description: string;
	confirmLabel: string;
	isDestructive?: boolean;
}

export interface TransitionAction {
	label: string;
	icon: LucideIcon;
	variant: "default" | "outline";
	confirmation?: TransitionConfirmation;
}

export const TRANSITION_ACTIONS: Partial<
	Record<ShipmentStatus, TransitionAction>
> = {
	[ShipmentStatus.InTransit]: {
		label: "Отправить в путь",
		icon: TrainFront,
		variant: "default",
	},
	[ShipmentStatus.Delivered]: {
		label: "Отметить доставку",
		icon: PackageCheck,
		variant: "default",
		confirmation: {
			title: "Отметить заявку доставленной?",
			description:
				"«Доставлена» — финальный статус. После подтверждения изменить его будет нельзя.",
			confirmLabel: "Подтвердить доставку",
		},
	},
	[ShipmentStatus.Cancelled]: {
		label: "Отменить заявку",
		icon: CircleX,
		variant: "outline",
		confirmation: {
			title: "Отменить заявку?",
			description:
				"«Отменена» — финальный статус. Вернуть заявку в работу будет нельзя.",
			confirmLabel: "Отменить заявку",
			isDestructive: true,
		},
	},
};
