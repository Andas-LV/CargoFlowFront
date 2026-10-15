"use client";

import { Send } from "lucide-react";

import type { TelegramLink } from "@/entities/telegram";
import { getErrorMessage } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { useLinkTelegram } from "../model/use-link-telegram";

interface LinkTelegramButtonProps {
	label?: string;
	variant?: "default" | "outline";
	onLinkOpened?: (link: TelegramLink) => void;
}

export function LinkTelegramButton({
	label = "Подключить Telegram",
	variant = "default",
	onLinkOpened,
}: LinkTelegramButtonProps) {
	const { linkTelegram, isPending, error, isUnavailable } = useLinkTelegram({
		onLinkOpened,
	});

	return (
		<div className="flex flex-col items-start gap-2">
			<Button
				variant={variant}
				onClick={linkTelegram}
				disabled={isPending || isUnavailable}
			>
				{isPending ? <Spinner /> : <Send />}
				{isUnavailable ? "Временно недоступно" : label}
			</Button>
			{error && (
				<p role="alert" className="text-muted-foreground text-xs">
					{isUnavailable
						? "Подключение Telegram сейчас недоступно, попробуйте позже"
						: getErrorMessage(error)}
				</p>
			)}
		</div>
	);
}
