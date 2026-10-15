import { z } from "zod";
import { emailSchema, passwordSchema } from "@/entities/session";

export const registerSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
		passwordConfirmation: z.string().min(1, "Повторите пароль"),
	})
	.refine((values) => values.password === values.passwordConfirmation, {
		path: ["passwordConfirmation"],
		message: "Пароли не совпадают",
	});

export type RegisterFormValues = z.infer<typeof registerSchema>;
