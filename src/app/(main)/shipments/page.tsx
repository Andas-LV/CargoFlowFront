import type { Metadata } from "next";

import { ShipmentsPage, parseShipmentsView } from "@/views/shipments";

export const metadata: Metadata = { title: "Мои заявки" };

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ view?: string | string[] }>;
}) {
	const { view } = await searchParams;

	return <ShipmentsPage view={parseShipmentsView(view)} />;
}
