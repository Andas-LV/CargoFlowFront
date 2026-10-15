import { Plus } from "lucide-react";
import Link from "next/link";

import { ShipmentList } from "@/widgets/shipment-list";
import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { PageHeader } from "@/shared/ui/page-header";

export function ShipmentsPage() {
	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				title="Мои заявки"
				description="Новые заявки сверху"
				actions={
					<Button asChild>
						<Link href={routes.newShipment}>
							<Plus />
							Новая заявка
						</Link>
					</Button>
				}
			/>
			<ShipmentList />
		</div>
	);
}
