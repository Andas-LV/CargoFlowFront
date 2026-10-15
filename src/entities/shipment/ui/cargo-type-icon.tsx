import { cn } from "@/shared/lib/utils";
import { CARGO_TYPE_META } from "../model/cargo-type";
import type { CargoType } from "../model/types";

interface CargoTypeIconProps {
	cargoType: CargoType;
	className?: string;
}

export function CargoTypeIcon({ cargoType, className }: CargoTypeIconProps) {
	const { icon: Icon, label } = CARGO_TYPE_META[cargoType];

	return (
		<span
			title={label}
			className={cn(
				"bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg",
				className,
			)}
		>
			<Icon className="size-5" />
		</span>
	);
}
