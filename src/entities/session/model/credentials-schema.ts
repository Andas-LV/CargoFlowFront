import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;

export const emailSchema = z
	.string()
	.trim()
	.min(1, "Введите email")
	.email("Некорректный email");

export const passwordSchema = z
	.string()
	.min(PASSWORD_MIN_LENGTH, `Минимум ${PASSWORD_MIN_LENGTH} символов`);
