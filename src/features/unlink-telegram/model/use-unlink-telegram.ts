import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { telegramApi, telegramQueries } from "@/entities/telegram";
import { getErrorMessage } from "@/shared/api";

export const useUnlinkTelegram = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: telegramApi.unlink,
		onSuccess: () => {
			queryClient.setQueryData(telegramQueries.status().queryKey, {
				linked: false,
				linkedAt: null,
			});
			toast.success("Telegram отключён", {
				description: "Уведомления больше не будут приходить",
			});
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});
};
