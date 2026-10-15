"use client";

import { useQuery } from "@tanstack/react-query";
import { MapPinned, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
	ShipmentStatus,
	shipmentQueries,
	type Shipment,
} from "@/entities/shipment";
import { getErrorMessage } from "@/shared/api";
import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorState } from "@/shared/ui/error-state";
import {
	Layer,
	MapView,
	Popup,
	Source,
	useMapPalette,
	type ExpressionSpecification,
	type MapLayerMouseEvent,
} from "@/shared/ui/map";
import { Skeleton } from "@/shared/ui/skeleton";
import {
	buildRoutesCollection,
	buildStationsCollection,
	getShipmentsBounds,
} from "../model/shipments-geojson";
import { ShipmentPopupContent } from "./shipment-popup-content";
import { StatusFilter } from "./status-filter";

const MAP_PAGE_SIZE = 100;
const ROUTES_HIT_LAYER_ID = "shipments-routes-hit";
const MAP_HEIGHT = "h-[calc(100dvh-18rem)] min-h-[420px]";

const EMPTY_SHIPMENTS: Shipment[] = [];

const countByStatus = (shipments: readonly Shipment[]) =>
	shipments.reduce(
		(counts, { status }) => ({ ...counts, [status]: counts[status] + 1 }),
		Object.fromEntries(
			Object.values(ShipmentStatus).map((status) => [status, 0]),
		) as Record<ShipmentStatus, number>,
	);

export function ShipmentsMap() {
	const router = useRouter();
	const palette = useMapPalette();
	const [hiddenStatuses, setHiddenStatuses] = useState<
		ReadonlySet<ShipmentStatus>
	>(new Set());
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const {
		data: shipments = EMPTY_SHIPMENTS,
		error,
		isPending,
		isError,
		isFetching,
		refetch,
	} = useQuery(shipmentQueries.list(MAP_PAGE_SIZE));

	const visibleShipments = useMemo(
		() => shipments.filter(({ status }) => !hiddenStatuses.has(status)),
		[shipments, hiddenStatuses],
	);
	const counts = useMemo(() => countByStatus(shipments), [shipments]);
	const bounds = useMemo(() => getShipmentsBounds(shipments), [shipments]);
	const routesCollection = useMemo(
		() => buildRoutesCollection(visibleShipments),
		[visibleShipments],
	);
	const stationsCollection = useMemo(
		() => buildStationsCollection(visibleShipments),
		[visibleShipments],
	);

	const hoveredShipment = visibleShipments.find(({ id }) => id === hoveredId);
	const hoveredFeature = routesCollection.features.find(
		({ properties }) => properties.id === hoveredId,
	);
	const isHovered: ExpressionSpecification = [
		"==",
		["get", "id"],
		hoveredId ?? "",
	];

	const toggleStatus = (status: ShipmentStatus) => {
		setHiddenStatuses((current) => {
			const next = new Set(current);
			if (!next.delete(status)) next.add(status);
			return next;
		});
	};

	const handleMouseMove = (event: MapLayerMouseEvent) => {
		const id = event.features?.[0]?.properties?.id;
		setHoveredId(typeof id === "string" ? id : null);
	};

	const handleClick = (event: MapLayerMouseEvent) => {
		const id = event.features?.[0]?.properties?.id;
		if (typeof id === "string") router.push(routes.shipment(id));
	};

	if (isPending) return <Skeleton className={`${MAP_HEIGHT} rounded-xl`} />;

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
				icon={MapPinned}
				title="На карте пока пусто"
				description="Создайте заявку — её маршрут появится на карте."
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
		<section className="flex flex-col gap-2">
			<MapView
				bounds={bounds}
				boundsMaxZoom={7}
				className={MAP_HEIGHT}
				interactiveLayerIds={[ROUTES_HIT_LAYER_ID]}
				cursor={hoveredId ? "pointer" : "grab"}
				onMouseMove={handleMouseMove}
				onMouseLeave={() => setHoveredId(null)}
				onClick={handleClick}
				overlay={
					<div className="absolute top-3 left-3 z-10">
						<StatusFilter
							counts={counts}
							hiddenStatuses={hiddenStatuses}
							onToggle={toggleStatus}
						/>
					</div>
				}
			>
				<Source id="shipments-routes" type="geojson" data={routesCollection}>
					<Layer
						id="shipments-routes-casing"
						type="line"
						layout={{ "line-cap": "round" }}
						paint={{
							"line-color": palette.background,
							"line-width": ["case", isHovered, 9, 6],
							"line-opacity": 0.85,
						}}
					/>
					<Layer
						id="shipments-routes"
						type="line"
						layout={{ "line-cap": "round" }}
						paint={{
							"line-color": ["get", "color"],
							"line-width": ["case", isHovered, 5, 3],
							"line-opacity": hoveredId ? ["case", isHovered, 1, 0.35] : 0.9,
						}}
					/>
					<Layer
						id={ROUTES_HIT_LAYER_ID}
						type="line"
						paint={{
							"line-color": "#000000",
							"line-width": 16,
							"line-opacity": 0,
						}}
					/>
				</Source>
				<Source
					id="shipments-stations"
					type="geojson"
					data={stationsCollection}
				>
					<Layer
						id="shipments-stations"
						type="circle"
						paint={{
							"circle-radius": 4.5,
							"circle-color": palette.background,
							"circle-stroke-color": palette.foreground,
							"circle-stroke-width": 2,
						}}
					/>
					<Layer
						id="shipments-stations-labels"
						type="symbol"
						layout={{
							"text-field": ["get", "name"],
							"text-font": ["Noto Sans Bold"],
							"text-size": 11,
							"text-offset": [0, 1],
							"text-anchor": "top",
							"text-optional": true,
						}}
						paint={{
							"text-color": palette.foreground,
							"text-halo-color": palette.background,
							"text-halo-width": 1.5,
						}}
					/>
				</Source>
				{hoveredShipment && hoveredFeature && (
					<Popup
						longitude={hoveredFeature.properties.midLng}
						latitude={hoveredFeature.properties.midLat}
						closeButton={false}
						closeOnClick={false}
						offset={12}
						className="cf-map-popup"
					>
						<ShipmentPopupContent shipment={hoveredShipment} />
					</Popup>
				)}
			</MapView>
			<p className="text-muted-foreground text-xs">
				Нажмите на линию маршрута, чтобы открыть заявку. На карте — последние{" "}
				{MAP_PAGE_SIZE} заявок.
			</p>
		</section>
	);
}
