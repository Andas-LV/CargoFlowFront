import { useController, type Control } from "react-hook-form";

import { StationAutocomplete } from "@/entities/station";
import { FormField, fieldMessageId } from "@/shared/ui/form-field";
import type { CreateShipmentFormInput } from "../model/create-shipment-schema";

interface StationFieldProps {
	control: Control<CreateShipmentFormInput>;
	name: "origin" | "destination";
	label: string;
	placeholder: string;
	excludedStationId?: string;
}

export function StationField({
	control,
	name,
	label,
	placeholder,
	excludedStationId,
}: StationFieldProps) {
	const {
		field: { ref, value, onChange, onBlur },
		fieldState: { error },
	} = useController({ control, name });

	return (
		<FormField label={label} htmlFor={name} error={error?.message}>
			<StationAutocomplete
				id={name}
				ref={ref}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				isItemDisabled={(station) => station.id === excludedStationId}
				aria-invalid={!!error}
				aria-describedby={fieldMessageId(name)}
			/>
		</FormField>
	);
}
