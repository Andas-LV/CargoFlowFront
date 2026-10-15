"use client";

import { useQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import Link from "next/link";

import { ShipmentOverview } from "@/widgets/shipment-overview";
import { ShipmentRoute } from "@/widgets/shipment-route";
import {
	ShipmentDirection,
	ShipmentStatusBadge,
	shipmentQueries,
} from "@/entities/shipment";
import { getErrorMessage, isApiError } from "@/shared/api";
import { routes } from "@/shared/config";
import { shortId } from "@/shared/lib/short-id";
import { BackLink } from "@/shared/ui/back-link";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorState } from "@/shared/ui/error-state";
import { PageHeader } from "@/shared/ui/page-header";
import { Skeleton } from "@/shared/ui/skeleton";

interface ShipmentPageProps {
	shipmentId: string;
}

const backLink = <BackLink href={routes.shipments}>Мои заявки</BackLink>;

function ShipmentPageSkeleton() {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-3">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-9 w-64" />
				<Skeleton className="h-4 w-48" />
			</div>
			<div className="grid gap-6 lg:grid-cols-2">
				<Skeleton className="h-72 rounded-xl" />
				<Skeleton className="h-72 rounded-xl" />
			</div>
		</div>
	);
}

export function ShipmentPage({ shipmentId }: ShipmentPageProps) {
	const {
		data: shipment,
		error,
		isPending,
		isError,
		isFetching,
		refetch,
	} = useQuery(shipmentQueries.detail(shipmentId));

	if (isPending) return <ShipmentPageSkeleton />;

	if (isError) {
		const isNotFound = isApiError(error, 400, 404);

		return (
			<div className="flex flex-col gap-8">
				{backLink}
				{isNotFound ? (
					<EmptyState
						icon={SearchX}
						title="Заявка не найдена"
						description="Возможно, она была удалена или принадлежит другому пользователю."
						action={
							<Button asChild variant="outline">
								<Link href={routes.shipments}>К списку заявок</Link>
							</Button>
						}
					/>
				) : (
					<ErrorState
						message={getErrorMessage(error)}
						onRetry={() => refetch()}
						isRetrying={isFetching}
					/>
				)}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			<PageHeader
				eyebrow={backLink}
				title={
					<span className="flex flex-wrap items-center gap-3">
						Заявка <span className="font-mono">#{shortId(shipment.id)}</span>
						<ShipmentStatusBadge status={shipment.status} className="text-sm" />
					</span>
				}
				description={<ShipmentDirection shipment={shipment} />}
			/>
			<div className="grid items-start gap-6 lg:grid-cols-2">
				<ShipmentOverview shipment={shipment} />
				<ShipmentRoute shipment={shipment} />
			</div>
		</div>
	);
}
