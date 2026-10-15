import { http } from "@/shared/api";
import type { TelegramLink, TelegramStatus } from "../model/types";

const TELEGRAM_PATH = "/v1/notifications/telegram";

export const telegramApi = {
	getStatus: async () => {
		const { data } = await http.get<TelegramStatus>(TELEGRAM_PATH);
		return data;
	},

	createLink: async () => {
		const { data } = await http.post<TelegramLink>(`${TELEGRAM_PATH}/link`, {});
		return data;
	},

	unlink: async () => {
		await http.delete(TELEGRAM_PATH);
	},
};
