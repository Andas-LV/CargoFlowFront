"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinPlus } from "lucide-react";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";

import { OsmAttribution, StationAutocomplete } from "@/entities/station";
import { getErrorMessage } from "@/shared/api";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/ui/dialog";
import { FormField, fieldMessageId } from "@/shared/ui/form-field";
import {
	ADD_POSITION_DEFAULTS,
	addPositionSchema,
	toAddPositionPayload,
	type AddPositionFormInput,
	type AddPositionFormValues,
} from "../model/add-position-schema";
import { useAddPosition } from "../model/use-add-position";

interface AddPositionDialogProps {
	shipmentId: string;
	lastStationId?: string;
}

const STATION_FIELD_ID = "position-station";

export function AddPositionDialog({
	shipmentId,
	lastStationId,
}: AddPositionDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const addPosition = useAddPosition(shipmentId);
	const { control, handleSubmit, reset } = useForm<
		AddPositionFormInput,
		unknown,
		AddPositionFormValues
	>({
		resolver: zodResolver(addPositionSchema),
		defaultValues: ADD_POSITION_DEFAULTS,
	});
	const {
		field: { ref, value, onChange, onBlur },
		fieldState: { error },
	} = useController({ control, name: "station" });

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			reset(ADD_POSITION_DEFAULTS);
			addPosition.reset();
		}
	};

	const onSubmit = handleSubmit((values) =>
		addPosition.mutate(toAddPositionPayload(values), {
			onSuccess: () => handleOpenChange(false),
		}),
	);

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<MapPinPlus />
					Отметить станцию
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Отметить станцию</DialogTitle>
					<DialogDescription>
						Точка добавится в маршрут. Статус заявки при этом не меняется.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} noValidate className="grid gap-4">
					{addPosition.isError && (
						<Alert variant="destructive">
							<AlertDescription>
								{getErrorMessage(addPosition.error)}
							</AlertDescription>
						</Alert>
					)}
					<FormField
						label="Станция"
						htmlFor={STATION_FIELD_ID}
						error={error?.message}
						hint="Координаты подставятся из справочника"
					>
						<StationAutocomplete
							id={STATION_FIELD_ID}
							ref={ref}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							placeholder="Например, Караганда"
							isItemDisabled={(station) => station.id === lastStationId}
							autoFocus
							aria-invalid={!!error}
							aria-describedby={fieldMessageId(STATION_FIELD_ID)}
						/>
					</FormField>
					<OsmAttribution />
					<DialogFooter className="mt-2">
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Отмена
							</Button>
						</DialogClose>
						<Button type="submit" loading={addPosition.isPending}>
							Отметить
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
