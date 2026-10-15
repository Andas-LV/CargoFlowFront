"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getErrorMessage } from "@/shared/api";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { FormField, fieldMessageId } from "@/shared/ui/form-field";
import { Input } from "@/shared/ui/input";
import { PasswordInput } from "@/shared/ui/password-input";
import { Spinner } from "@/shared/ui/spinner";
import { loginSchema, type LoginFormValues } from "../model/login-schema";
import { useLogin } from "../model/use-login";

export function LoginForm() {
	const login = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = handleSubmit((values) => login.mutate(values));
	const isPending = login.isPending || login.isSuccess;

	return (
		<form onSubmit={onSubmit} noValidate className="grid gap-4">
			{login.isError && (
				<Alert variant="destructive">
					<AlertDescription>{getErrorMessage(login.error)}</AlertDescription>
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
			>
				<PasswordInput
					id="password"
					autoComplete="current-password"
					aria-invalid={!!errors.password}
					aria-describedby={fieldMessageId("password")}
					{...register("password")}
				/>
			</FormField>
			<Button type="submit" size="lg" disabled={isPending} className="mt-2">
				{isPending && <Spinner />}
				Войти
			</Button>
		</form>
	);
}
