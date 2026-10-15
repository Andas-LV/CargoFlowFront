"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PASSWORD_MIN_LENGTH } from "@/entities/session";
import { getErrorMessage, isApiError } from "@/shared/api";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { FormField, fieldMessageId } from "@/shared/ui/form-field";
import { Input } from "@/shared/ui/input";
import { PasswordInput } from "@/shared/ui/password-input";
import { Spinner } from "@/shared/ui/spinner";
import {
	registerSchema,
	type RegisterFormValues,
} from "../model/register-schema";
import { useRegister } from "../model/use-register";

export function RegisterForm() {
	const registration = useRegister();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: "", password: "", passwordConfirmation: "" },
	});

	const onSubmit = handleSubmit(({ email, password }) =>
		registration.mutate(
			{ email, password },
			{
				onError: (error) => {
					if (isApiError(error, 409)) {
						setError("email", { message: getErrorMessage(error) });
					}
				},
			},
		),
	);

	const isPending = registration.isPending || registration.isSuccess;
	const formError =
		registration.isError && !isApiError(registration.error, 409)
			? getErrorMessage(registration.error)
			: null;

	return (
		<form onSubmit={onSubmit} noValidate className="grid gap-4">
			{formError && (
				<Alert variant="destructive">
					<AlertDescription>{formError}</AlertDescription>
				</Alert>
			)}
			<FormField label="Email" htmlFor="email" error={errors.email?.message}>
				<Input
					id="email"
					type="email"
					autoComplete="email"
					placeholder="you@company.kz"
					autoFocus
					aria-invalid={!!errors.email}
					aria-describedby={fieldMessageId("email")}
					{...register("email")}
				/>
			</FormField>
			<FormField
				label="Пароль"
				htmlFor="password"
				error={errors.password?.message}
				hint={`Не короче ${PASSWORD_MIN_LENGTH} символов`}
			>
				<PasswordInput
					id="password"
					autoComplete="new-password"
					aria-invalid={!!errors.password}
					aria-describedby={fieldMessageId("password")}
					{...register("password")}
				/>
			</FormField>
			<FormField
				label="Повторите пароль"
				htmlFor="passwordConfirmation"
				error={errors.passwordConfirmation?.message}
			>
				<PasswordInput
					id="passwordConfirmation"
					autoComplete="new-password"
					aria-invalid={!!errors.passwordConfirmation}
					aria-describedby={fieldMessageId("passwordConfirmation")}
					{...register("passwordConfirmation")}
				/>
			</FormField>
			<Button type="submit" size="lg" disabled={isPending} className="mt-2">
				{isPending && <Spinner />}
				Создать аккаунт
			</Button>
		</form>
	);
}
