"use client";

import { Unlink } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import { useUnlinkTelegram } from "../model/use-unlink-telegram";

interface UnlinkTelegramButtonProps {
	onUnlinked?: () => void;
}

export function UnlinkTelegramButton({
	onUnlinked,
}: UnlinkTelegramButtonProps) {
	const unlink = useUnlinkTelegram();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" loading={unlink.isPending}>
					<Unlink />
					Отключить
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Отключить Telegram?</AlertDialogTitle>
					<AlertDialogDescription>
						Уведомления о заявках перестанут приходить. Подключить Telegram
						снова можно в любой момент.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Назад</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						onClick={() => unlink.mutate(undefined, { onSuccess: onUnlinked })}
					>
						Отключить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
