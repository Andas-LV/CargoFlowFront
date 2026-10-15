"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CreateShipmentForm } from "@/features/create-shipment";
import type { Shipment } from "@/entities/shipment";
import { getStationName } from "@/entities/station";
import { routes } from "@/shared/config";
import { BackLink } from "@/shared/ui/back-link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { PageHeader } from "@/shared/ui/page-header";

export function NewShipmentPage() {
	const router = useRouter();

	const handleCreated = (shipment: Shipment) => {
		toast.success("Заявка создана", {
			description: `${getStationName(shipment.originStation)} → ${getStationName(shipment.destinationStation)}`,
		});
		router.push(routes.shipment(shipment.id));
	};

	return (
		<div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
			<PageHeader
				eyebrow={<BackLink href={routes.shipments}>Мои заявки</BackLink>}
				title="Новая заявка"
				description="Укажите тип груза и станции — заявка получит статус «Создана»"
			/>
			<Card>
				<CardContent>
					<CreateShipmentForm
						onCreated={handleCreated}
						secondaryAction={
							<Button variant="ghost" asChild>
								<Link href={routes.shipments}>Отмена</Link>
							</Button>
						}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
