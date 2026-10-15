"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import {
	ADD_POSITION_DEFAULTS,
	addPositionSchema,
	type AddPositionFormInput,
	type AddPositionFormValues,
} from "../model/add-position-schema";
import { useAddPosition } from "../model/use-add-position";

interface AddPositionDialogProps {
	shipmentId: string;
}

export function AddPositionDialog({ shipmentId }: AddPositionDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const addPosition = useAddPosition(shipmentId);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddPositionFormInput, unknown, AddPositionFormValues>({
		resolver: zodResolver(addPositionSchema),
		defaultValues: ADD_POSITION_DEFAULTS,
	});

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			reset(ADD_POSITION_DEFAULTS);
			addPosition.reset();
		}
	};

	const onSubmit = handleSubmit((values) =>
		addPosition.mutate(values, { onSuccess: () => handleOpenChange(false) }),
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
						htmlFor="station"
						error={errors.station?.message}
					>
						<Input
							id="station"
							placeholder="Karaganda"
							autoComplete="off"
							autoFocus
							aria-invalid={!!errors.station}
							aria-describedby={fieldMessageId("station")}
							{...register("station")}
						/>
					</FormField>
					<div className="grid gap-4 sm:grid-cols-2">
						<FormField
							label="Широта"
							htmlFor="lat"
							error={errors.lat?.message}
							hint="Необязательно"
						>
							<Input
								id="lat"
								inputMode="decimal"
								placeholder="49.8047"
								autoComplete="off"
								aria-invalid={!!errors.lat}
								aria-describedby={fieldMessageId("lat")}
								{...register("lat")}
							/>
						</FormField>
						<FormField
							label="Долгота"
							htmlFor="lon"
							error={errors.lon?.message}
							hint="Необязательно"
						>
							<Input
								id="lon"
								inputMode="decimal"
								placeholder="73.1094"
								autoComplete="off"
								aria-invalid={!!errors.lon}
								aria-describedby={fieldMessageId("lon")}
								{...register("lon")}
							/>
						</FormField>
					</div>
					<DialogFooter className="mt-2">
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Отмена
							</Button>
						</DialogClose>
						<Button type="submit" disabled={addPosition.isPending}>
							{addPosition.isPending && <Spinner />}
							Отметить
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
