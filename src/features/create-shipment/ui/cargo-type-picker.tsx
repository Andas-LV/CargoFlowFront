import { Check } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { CARGO_TYPE_META, CARGO_TYPES } from "@/entities/shipment";
import { cn } from "@/shared/lib/utils";

interface CargoTypePickerProps {
	registration: UseFormRegisterReturn<"cargoType">;
	isInvalid?: boolean;
}

export function CargoTypePicker({
	registration,
	isInvalid,
}: CargoTypePickerProps) {
	return (
		<div
			role="radiogroup"
			aria-invalid={isInvalid}
			className="grid gap-3 sm:grid-cols-2"
		>
			{CARGO_TYPES.map((cargoType) => {
				const { icon: Icon, label, description } = CARGO_TYPE_META[cargoType];

				return (
					<label
						key={cargoType}
						className={cn(
							"group hover:bg-accent/50 relative flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
							"has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-[3px]",
							isInvalid && "border-destructive",
						)}
					>
						<input
							type="radio"
							value={cargoType}
							className="sr-only"
							{...registration}
						/>
						<span className="bg-muted group-has-[:checked]:bg-primary group-has-[:checked]:text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-md transition-colors">
							<Icon className="size-5" />
						</span>
						<span className="flex flex-col">
							<span className="text-sm font-medium">{label}</span>
							<span className="text-muted-foreground text-xs">
								{description}
							</span>
						</span>
						<Check className="text-primary absolute top-3 right-3 size-4 opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
					</label>
				);
			})}
		</div>
	);
}
