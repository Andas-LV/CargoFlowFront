"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PackageOpen, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
	DEFAULT_SHIPMENTS_PAGE_SIZE,
	ShipmentCard,
	shipmentQueries,
	type ShipmentsPageSize,
} from "@/entities/shipment";
import { getErrorMessage } from "@/shared/api";
import { routes } from "@/shared/config";
import { pluralize } from "@/shared/lib/plural";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorState } from "@/shared/ui/error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { PageSizeSelect } from "./page-size-select";

const SKELETON_ROWS = 4;

export function ShipmentList() {
	const [pageSize, setPageSize] = useState<ShipmentsPageSize>(
		DEFAULT_SHIPMENTS_PAGE_SIZE,
	);
	const {
		data: shipments,
		error,
		isPending,
		isError,
		isFetching,
		isPlaceholderData,
		refetch,
	} = useQuery({
		...shipmentQueries.list(pageSize),
		placeholderData: keepPreviousData,
	});

	if (isPending) {
		return (
			<div className="flex flex-col gap-3">
				{Array.from({ length: SKELETON_ROWS }, (_, index) => (
					<Skeleton key={index} className="h-[74px] rounded-xl" />
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<ErrorState
				message={getErrorMessage(error)}
				onRetry={() => refetch()}
				isRetrying={isFetching}
			/>
		);
	}

	if (shipments.length === 0) {
		return (
			<EmptyState
				icon={PackageOpen}
				title="Заявок пока нет"
				description="Создайте первую заявку на перевозку вагона или контейнера — она появится здесь."
				action={
					<Button asChild>
						<Link href={routes.newShipment}>
							<Plus />
							Новая заявка
						</Link>
					</Button>
				}
			/>
		);
	}

	return (
		<section className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-4">
				<p className="text-muted-foreground text-sm">
					{shipments.length}{" "}
					{pluralize(shipments.length, {
						one: "заявка",
						few: "заявки",
						many: "заявок",
					})}
				</p>
				<PageSizeSelect value={pageSize} onChange={setPageSize} />
			</div>
			<ul
				className={cn(
					"flex flex-col gap-3 transition-opacity",
					isPlaceholderData && "opacity-60",
				)}
			>
				{shipments.map((shipment) => (
					<li key={shipment.id}>
						<ShipmentCard
							shipment={shipment}
							href={routes.shipment(shipment.id)}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
