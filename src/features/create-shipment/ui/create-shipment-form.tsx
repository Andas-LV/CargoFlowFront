"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRight } from "lucide-react";
import type { ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { Shipment } from "@/entities/shipment";
import { OsmAttribution } from "@/entities/station";
import { getErrorMessage } from "@/shared/api";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import {
	CREATE_SHIPMENT_DEFAULTS,
	createShipmentSchema,
	toCreateShipmentPayload,
	type CreateShipmentFormInput,
	type CreateShipmentFormValues,
} from "../model/create-shipment-schema";
import { useCreateShipment } from "../model/use-create-shipment";
import { CargoTypePicker } from "./cargo-type-picker";
import { StationField } from "./station-field";

interface CreateShipmentFormProps {
	onCreated: (shipment: Shipment) => void;
	secondaryAction?: ReactNode;
}

export function CreateShipmentForm({
	onCreated,
	secondaryAction,
}: CreateShipmentFormProps) {
	const createShipment = useCreateShipment();
	const {
		control,
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitted },
	} = useForm<CreateShipmentFormInput, unknown, CreateShipmentFormValues>({
		resolver: zodResolver(createShipmentSchema),
		defaultValues: CREATE_SHIPMENT_DEFAULTS,
	});
	const [origin, destination] = useWatch({
		control,
		name: ["origin", "destination"],
	});

	const swapStations = () => {
		const values = getValues();
		setValue("origin", values.destination, { shouldValidate: isSubmitted });
		setValue("destination", values.origin, { shouldValidate: isSubmitted });
	};

	const onSubmit = handleSubmit((values) =>
		createShipment.mutate(toCreateShipmentPayload(values), {
			onSuccess: onCreated,
		}),
	);

	const isPending = createShipment.isPending || createShipment.isSuccess;

	return (
		<form onSubmit={onSubmit} noValidate className="grid gap-6">
			{createShipment.isError && (
				<Alert variant="destructive">
					<AlertDescription>
						{getErrorMessage(createShipment.error)}
					</AlertDescription>
				</Alert>
			)}

			<fieldset className="grid gap-2">
				<legend className="mb-2 text-sm font-medium">Тип груза</legend>
				<CargoTypePicker
					registration={register("cargoType")}
					isInvalid={!!errors.cargoType}
				/>
				{errors.cargoType && (
					<p role="alert" className="text-destructive text-xs">
						{errors.cargoType.message}
					</p>
				)}
			</fieldset>

			<div className="grid gap-2">
				<div className="grid items-start gap-4 sm:grid-cols-[1fr_auto_1fr]">
					<StationField
						control={control}
						name="origin"
						label="Откуда"
						placeholder="Например, Алматы-1"
						excludedStationId={destination?.id}
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={swapStations}
						disabled={!origin && !destination}
						aria-label="Поменять станции местами"
						className="justify-self-center sm:mt-[1.375rem]"
					>
						<ArrowLeftRight className="rotate-90 sm:rotate-0" />
					</Button>
					<StationField
						control={control}
						name="destination"
						label="Куда"
						placeholder="Например, Караганда"
						excludedStationId={origin?.id}
					/>
				</div>
				<OsmAttribution />
			</div>

			<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				{secondaryAction}
				<Button type="submit" loading={isPending}>
					Создать заявку
				</Button>
			</div>
		</form>
	);
}
