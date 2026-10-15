import { useMutation } from "@tanstack/react-query";

import { telegramApi, type TelegramLink } from "@/entities/telegram";
import { isApiError } from "@/shared/api";

const openBlankTab = () => {
	const tab = window.open("", "_blank");
	if (tab) tab.opener = null;
	return tab;
};

const navigateTab = (tab: Window | null, url: string) => {
	if (tab && !tab.closed) {
		tab.location.href = url;
		return;
	}
	window.open(url, "_blank", "noopener,noreferrer");
};

interface UseLinkTelegramOptions {
	onLinkOpened?: (link: TelegramLink) => void;
}

export const useLinkTelegram = ({
	onLinkOpened,
}: UseLinkTelegramOptions = {}) => {
	const mutation = useMutation({ mutationFn: telegramApi.createLink });

	const linkTelegram = () => {
		const tab = openBlankTab();

		mutation.mutate(undefined, {
			onSuccess: (link) => {
				navigateTab(tab, link.url);
				onLinkOpened?.(link);
			},
			onError: () => tab?.close(),
		});
	};

	return {
		linkTelegram,
		isPending: mutation.isPending,
		error: mutation.error,
		isUnavailable: isApiError(mutation.error, 400),
	};
};
