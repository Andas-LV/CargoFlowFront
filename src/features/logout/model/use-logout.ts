import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { clearSession } from "@/entities/session";
import { routes } from "@/shared/config";

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useCallback(() => {
		clearSession();
		queryClient.clear();
		router.replace(routes.login);
		router.refresh();
	}, [queryClient, router]);
};
