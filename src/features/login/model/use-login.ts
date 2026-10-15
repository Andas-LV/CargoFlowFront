import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { sessionApi, startSession, type Credentials } from "@/entities/session";
import { routes } from "@/shared/config";
import { resolveRedirectPath } from "@/shared/lib/redirect";

export const useLogin = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (credentials: Credentials) => {
			const tokens = await sessionApi.login(credentials);
			startSession(tokens, credentials.email);
		},
		onSuccess: () => {
			router.replace(resolveRedirectPath(routes.shipments));
			router.refresh();
		},
	});
};
