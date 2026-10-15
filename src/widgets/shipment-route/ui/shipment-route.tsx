"use client";

import { useQuery } from "@tanstack/react-query";
import { MapPinned } from "lucide-react";

import { AddPositionDialog } from "@/features/add-position";
import { RouteTimeline, positionQueries } from "@/entities/position";
import { isFinalStatus, type Shipment } from "@/entities/shipment";
import { getErrorMessage } from "@/shared/api";
import { pluralize } from "@/shared/lib/plural";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorState } from "@/shared/ui/error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { Spinner } from "@/shared/ui/spinner";

const EMPTY_ROUTE_POLL_INTERVAL_MS = 2_000;
const EMPTY_ROUTE_POLL_ATTEMPTS = 10;

interface ShipmentRouteProps {
	shipment: Shipment;
}

export function ShipmentRoute({ shipment }: ShipmentRouteProps) {
	const {
		data: positions,
		error,
		isPending,
		isError,
		isFetching,
		refetch,
	} = useQuery({
		...positionQueries.route(shipment.id),
		refetchInterval: ({ state }) =>
			state.data?.length === 0 &&
			state.dataUpdateCount < EMPTY_ROUTE_POLL_ATTEMPTS
				? EMPTY_ROUTE_POLL_INTERVAL_MS
				: false,
	});

	const canAddPosition = !isFinalStatus(shipment.status);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Маршрут</CardTitle>
				<CardDescription>
					{positions?.length
						? `${positions.length} ${pluralize(positions.length, {
								one: "станция",
								few: "станции",
								many: "станций",
							})} в истории`
						: "История станций, через которые прошёл груз"}
				</CardDescription>
				{canAddPosition && (
					<CardAction>
						<AddPositionDialog shipmentId={shipment.id} />
					</CardAction>
				)}
			</CardHeader>
			<CardContent>
				{isPending ? (
					<div className="flex flex-col gap-4">
						<Skeleton className="h-10" />
						<Skeleton className="h-10" />
					</div>
				) : isError ? (
					<ErrorState
						message={getErrorMessage(error)}
						onRetry={() => refetch()}
						isRetrying={isFetching}
					/>
				) : positions.length === 0 ? (
					<EmptyState
						icon={MapPinned}
						title="Маршрут пока пуст"
						description={
							<span className="inline-flex items-center gap-2">
								{isFetching && <Spinner className="size-3" />}
								Станция отправления появится через пару секунд после создания
								заявки
							</span>
						}
					/>
				) : (
					<RouteTimeline positions={positions} />
				)}
			</CardContent>
		</Card>
	);
}
