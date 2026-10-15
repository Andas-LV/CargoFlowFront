"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { clearSession } from "@/entities/session";
import { sessionEvents } from "@/shared/api";
import { REDIRECT_PARAM, routes } from "@/shared/config";

const SESSION_EXPIRED_TOAST_ID = "session-expired";

export function SessionExpiryListener() {
	const router = useRouter();
	const queryClient = useQueryClient();

	useEffect(
		() =>
			sessionEvents.onExpired(() => {
				clearSession();
				queryClient.clear();
				toast.error("Сессия истекла", {
					id: SESSION_EXPIRED_TOAST_ID,
					description: "Войдите снова, чтобы продолжить",
				});

				const from = `${window.location.pathname}${window.location.search}`;
				const params = new URLSearchParams({ [REDIRECT_PARAM]: from });
				router.replace(`${routes.login}?${params}`);
			}),
		[queryClient, router],
	);

	return null;
}
