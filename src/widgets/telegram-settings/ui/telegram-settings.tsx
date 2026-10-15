"use client";

import { useQuery } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { LinkTelegramButton } from "@/features/link-telegram";
import { UnlinkTelegramButton } from "@/features/unlink-telegram";
import { telegramQueries, type TelegramLink } from "@/entities/telegram";
import { getErrorMessage } from "@/shared/api";
import { formatDateTime, formatTime } from "@/shared/lib/date";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Badge } from "@/shared/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";
import { ErrorState } from "@/shared/ui/error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { Spinner } from "@/shared/ui/spinner";
import { NotificationExamples } from "./notification-examples";

const LINK_POLL_INTERVAL_MS = 3_000;

export function TelegramSettings() {
	const [pendingLink, setPendingLink] = useState<TelegramLink | null>(null);

	const {
		data: status,
		error,
		isPending,
		isError,
		isFetching,
		refetch,
	} = useQuery({
		...telegramQueries.status(),
		refetchInterval: ({ state }) =>
			pendingLink &&
			!state.data?.linked &&
			Date.parse(pendingLink.expiresAt) > Date.now()
				? LINK_POLL_INTERVAL_MS
				: false,
	});

	const isLinked = status?.linked ?? false;
	const isAwaitingConfirmation = pendingLink !== null && !isLinked;

	useEffect(() => {
		if (pendingLink && isLinked) {
			toast.success("Telegram подключён ✅", {
				description: "Уведомления о заявках будут приходить в бот",
			});
		}
	}, [pendingLink, isLinked]);

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-3">
					<span className="flex size-10 items-center justify-center rounded-lg bg-sky-500/12 text-sky-600 dark:text-sky-300">
						<Send className="size-5" />
					</span>
					<div className="flex flex-col gap-1">
						<CardTitle>Уведомления в Telegram</CardTitle>
						<CardDescription>
							Сообщения о ваших заявках приходят через секунду после действия
						</CardDescription>
					</div>
				</div>
				{status && (
					<CardAction>
						<Badge variant={isLinked ? "success" : "muted"}>
							<span className="size-1.5 rounded-full bg-current" />
							{isLinked ? "Подключено" : "Не подключено"}
						</Badge>
					</CardAction>
				)}
			</CardHeader>

			<CardContent className="flex flex-col gap-6">
				{isPending ? (
					<Skeleton className="h-24" />
				) : isError ? (
					<ErrorState
						message={getErrorMessage(error)}
						onRetry={() => refetch()}
						isRetrying={isFetching}
					/>
				) : (
					<>
						{isLinked && status.linkedAt && (
							<p className="text-muted-foreground text-sm">
								Подключено {formatDateTime(status.linkedAt)}
							</p>
						)}
						{isAwaitingConfirmation && (
							<Alert variant="info">
								<Spinner />
								<AlertTitle>Ждём подтверждения в Telegram</AlertTitle>
								<AlertDescription>
									<p>
										Откройте чат с ботом и нажмите <b>Start</b>. Ссылка
										одноразовая и действует до{" "}
										{formatTime(pendingLink.expiresAt)}. Если не успели —
										получите новую.
									</p>
								</AlertDescription>
							</Alert>
						)}
						<NotificationExamples />
					</>
				)}
			</CardContent>

			{status && (
				<CardFooter className="border-t">
					{isLinked ? (
						<UnlinkTelegramButton onUnlinked={() => setPendingLink(null)} />
					) : (
						<LinkTelegramButton
							label={
								isAwaitingConfirmation
									? "Получить новую ссылку"
									: "Подключить Telegram"
							}
							variant={isAwaitingConfirmation ? "outline" : "default"}
							onLinkOpened={setPendingLink}
						/>
					)}
				</CardFooter>
			)}
		</Card>
	);
}
