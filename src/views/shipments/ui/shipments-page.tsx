import { List, Map as MapIcon, Plus } from "lucide-react";
import Link from "next/link";

import { ShipmentList } from "@/widgets/shipment-list";
import { ShipmentsMap } from "@/widgets/shipments-map";
import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { PageHeader } from "@/shared/ui/page-header";
import { SegmentedControl } from "@/shared/ui/segmented-control";
import { ShipmentsView } from "../model/shipments-view";

interface ShipmentsPageProps {
	view: ShipmentsView;
}

export function ShipmentsPage({ view }: ShipmentsPageProps) {
	const isMap = view === ShipmentsView.Map;

	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Мои заявки"
				description={isMap ? "Маршруты заявок на карте" : "Новые заявки сверху"}
				actions={
					<>
						<SegmentedControl
							aria-label="Вид списка заявок"
							items={[
								{
									href: routes.shipments,
									label: "Список",
									icon: List,
									isActive: !isMap,
								},
								{
									href: routes.shipmentsMap,
									label: "Карта",
									icon: MapIcon,
									isActive: isMap,
								},
							]}
						/>
						<Button asChild>
							<Link href={routes.newShipment}>
								<Plus />
								Новая заявка
							</Link>
						</Button>
					</>
				}
			/>
			{isMap ? <ShipmentsMap /> : <ShipmentList />}
		</div>
	);
}
