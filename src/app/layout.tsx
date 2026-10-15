import type { Metadata } from "next";
import type { ReactNode } from "react";

import { manrope } from "@/core/assets/fonts";
import { Providers } from "@/core/providers/providers";
import { APP_NAME } from "@/shared/config";
import "@/core/styles/globals.css";

export const metadata: Metadata = {
	title: {
		template: `%s · ${APP_NAME}`,
		default: APP_NAME,
	},
	description: "Заявки на железнодорожные перевозки вагонов и контейнеров",
};

export default function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body className={`${manrope.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
