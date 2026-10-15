import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { sessionApi, startSession, type Credentials } from "@/entities/session";
import { routes } from "@/shared/config";

export const useRegister = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (credentials: Credentials) => {
			await sessionApi.register(credentials);
			const tokens = await sessionApi.login(credentials);
			startSession(tokens, credentials.email);
		},
		onSuccess: () => {
			toast.success("Аккаунт создан", {
				description: "Добро пожаловать в CargoFlow",
			});
			router.replace(routes.shipments);
			router.refresh();
		},
	});
};
