"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRight } from "lucide-react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";

import { CargoType, type Shipment } from "@/entities/shipment";
import { getErrorMessage } from "@/shared/api";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { FormField, fieldMessageId } from "@/shared/ui/form-field";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import {
	createShipmentSchema,
	type CreateShipmentFormValues,
} from "../model/create-shipment-schema";
import { useCreateShipment } from "../model/use-create-shipment";
import { CargoTypePicker } from "./cargo-type-picker";

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
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitted },
	} = useForm<CreateShipmentFormValues>({
		resolver: zodResolver(createShipmentSchema),
		defaultValues: {
			cargoType: CargoType.Wagon,
			origin: "",
			destination: "",
		},
	});

	const swapStations = () => {
		const { origin, destination } = getValues();
		setValue("origin", destination, { shouldValidate: isSubmitted });
		setValue("destination", origin, { shouldValidate: isSubmitted });
	};

	const onSubmit = handleSubmit((values) =>
		createShipment.mutate(values, { onSuccess: onCreated }),
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

			<div className="grid items-start gap-4 sm:grid-cols-[1fr_auto_1fr]">
				<FormField
					label="Откуда"
					htmlFor="origin"
					error={errors.origin?.message}
				>
					<Input
						id="origin"
						placeholder="Astana-1"
						autoComplete="off"
						aria-invalid={!!errors.origin}
						aria-describedby={fieldMessageId("origin")}
						{...register("origin")}
					/>
				</FormField>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={swapStations}
					aria-label="Поменять станции местами"
					className="justify-self-center sm:mt-[1.375rem]"
				>
					<ArrowLeftRight className="rotate-90 sm:rotate-0" />
				</Button>
				<FormField
					label="Куда"
					htmlFor="destination"
					error={errors.destination?.message}
				>
					<Input
						id="destination"
						placeholder="Almaty-2"
						autoComplete="off"
						aria-invalid={!!errors.destination}
						aria-describedby={fieldMessageId("destination")}
						{...register("destination")}
					/>
				</FormField>
			</div>

			<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				{secondaryAction}
				<Button type="submit" disabled={isPending}>
					{isPending && <Spinner />}
					Создать заявку
				</Button>
			</div>
		</form>
	);
}
