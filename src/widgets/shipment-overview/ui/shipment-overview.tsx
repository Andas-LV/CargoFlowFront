import type { ReactNode } from "react";

import { ChangeStatusActions } from "@/features/change-shipment-status";
import {
	CARGO_TYPE_META,
	CargoTypeIcon,
	ShipmentStatusProgress,
	isFinalStatus,
	type Shipment,
} from "@/entities/shipment";
import {
	formatStationMeta,
	getStationName,
	type Station,
} from "@/entities/station";
import { formatDateTime } from "@/shared/lib/date";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

interface ShipmentOverviewProps {
	shipment: Shipment;
}

function DetailRow({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) {
	return (
		<div className="flex items-center justify-between gap-4 py-3 text-sm">
			<dt className="text-muted-foreground">{label}</dt>
			<dd className="min-w-0 truncate text-right font-medium">{children}</dd>
		</div>
	);
}

function StationValue({ station }: { station: Station }) {
	return (
		<span className="flex flex-col items-end">
			<span className="truncate">{getStationName(station)}</span>
			<span className="text-muted-foreground text-xs font-normal">
				{formatStationMeta(station)}
			</span>
		</span>
	);
}

export function ShipmentOverview({ shipment }: ShipmentOverviewProps) {
	const cargo = CARGO_TYPE_META[shipment.cargoType];

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Статус</CardTitle>
					<CardDescription>
						{isFinalStatus(shipment.status)
							? "Заявка завершена"
							: "Переведите заявку на следующий этап"}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<div className="overflow-x-auto pb-1">
						<ShipmentStatusProgress status={shipment.status} />
					</div>
					<ChangeStatusActions shipment={shipment} />
				</CardContent>
			</Card>

			<Card className="gap-2">
				<CardHeader>
					<CardTitle>Детали заявки</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-2 flex items-center gap-3 py-2">
						<CargoTypeIcon cargoType={shipment.cargoType} />
						<div className="flex flex-col">
							<span className="font-medium">{cargo.label}</span>
							<span className="text-muted-foreground text-xs">
								{cargo.description}
							</span>
						</div>
					</div>
					<Separator />
					<dl className="divide-y">
						<DetailRow label="Откуда">
							<StationValue station={shipment.originStation} />
						</DetailRow>
						<DetailRow label="Куда">
							<StationValue station={shipment.destinationStation} />
						</DetailRow>
						<DetailRow label="Создана">
							{formatDateTime(shipment.createdAt)}
						</DetailRow>
						<DetailRow label="Изменена">
							{formatDateTime(shipment.updatedAt)}
						</DetailRow>
						<DetailRow label="ID">
							<span className="font-mono text-xs">{shipment.id}</span>
						</DetailRow>
					</dl>
				</CardContent>
			</Card>
		</div>
	);
}
