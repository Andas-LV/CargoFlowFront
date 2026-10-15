import { cookies } from "next/headers";
import type { ReactNode } from "react";

import { AppHeader } from "@/widgets/app-header";
import { AUTH_COOKIES } from "@/shared/config";
import { Container } from "@/shared/ui/container";

export default async function MainLayout({
	children,
}: {
	children: ReactNode;
}) {
	const cookieStore = await cookies();
	const email = cookieStore.get(AUTH_COOKIES.email)?.value;

	return (
		<div className="flex min-h-dvh flex-col">
			<AppHeader email={email} />
			<main className="flex-1 py-8 sm:py-10">
				<Container>{children}</Container>
			</main>
		</div>
	);
}
