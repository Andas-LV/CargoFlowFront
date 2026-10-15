import { z } from "zod";
import { emailSchema } from "@/entities/session";

export const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, "Введите пароль"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
