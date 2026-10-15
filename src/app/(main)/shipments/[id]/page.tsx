import type { Metadata } from "next";

import { ShipmentPage } from "@/views/shipment";

export const metadata: Metadata = { title: "Заявка" };

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <ShipmentPage shipmentId={id} />;
}
