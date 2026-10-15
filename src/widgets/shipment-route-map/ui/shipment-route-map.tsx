"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { positionQueries, type Position } from "@/entities/position";
import {
	SHIPMENT_STATUS_COLOR,
	ShipmentDirection,
	ShipmentStatusBadge,
	type Shipment,
} from "@/entities/shipment";
import { getStationName } from "@/entities/station";
import { shortId } from "@/shared/lib/short-id";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";
import { Layer, MapPin, MapView, Marker, Source } from "@/shared/ui/map";
import { buildRouteGeometry, toLineFeature } from "../model/route-geometry";
import { RouteLegend } from "./route-legend";

const EMPTY_POSITIONS: Position[] = [];

interface ShipmentRouteMapProps {
	shipment: Shipment;
}

export function ShipmentRouteMap({ shipment }: ShipmentRouteMapProps) {
	const { data: positions = EMPTY_POSITIONS } = useQuery(
		positionQueries.route(shipment.id),
	);

	const geometry = useMemo(
		() => buildRouteGeometry(shipment, positions),
		[shipment, positions],
	);
	const traveledLine = useMemo(
		() => toLineFeature(geometry.traveled),
		[geometry.traveled],
	);
	const remainingLine = useMemo(
		() => toLineFeature(geometry.remaining),
		[geometry.remaining],
	);

	const color = SHIPMENT_STATUS_COLOR[shipment.status];
	const hasRemaining = geometry.remaining.length > 0;

	return (
		<Card className="gap-4 pb-0">
			<CardHeader>
				<CardTitle>Карта маршрута</CardTitle>
				<CardDescription>
					{geometry.currentPosition
						? `Последняя отметка: ${geometry.currentPosition.station}`
						: "Станции отправления, назначения и отмеченные точки"}
				</CardDescription>
				<CardAction>
					<RouteLegend color={color} hasRemaining={hasRemaining} />
				</CardAction>
			</CardHeader>
			<MapView
				bounds={geometry.bounds}
				className="h-80 rounded-t-none border-x-0 border-b-0 sm:h-96"
				overlay={
					<div className="bg-background/90 absolute top-3 left-3 z-10 hidden max-w-[calc(100%-5rem)] flex-col gap-2 rounded-lg border px-3 py-2.5 shadow-sm backdrop-blur group-data-[fullscreen=true]/map:flex">
						<div className="flex items-center gap-2">
							<span className="text-sm font-semibold">
								Заявка{" "}
								<span className="font-mono">#{shortId(shipment.id)}</span>
							</span>
							<ShipmentStatusBadge status={shipment.status} />
						</div>
						<ShipmentDirection shipment={shipment} className="text-sm" />
						<RouteLegend color={color} hasRemaining={hasRemaining} />
					</div>
				}
			>
				{hasRemaining && (
					<Source id="route-remaining" type="geojson" data={remainingLine}>
						<Layer
							id="route-remaining"
							type="line"
							layout={{ "line-cap": "round" }}
							paint={{
								"line-color": color,
								"line-width": 3,
								"line-opacity": 0.7,
								"line-dasharray": [1.5, 2],
							}}
						/>
					</Source>
				)}
				<Source id="route-traveled" type="geojson" data={traveledLine}>
					<Layer
						id="route-traveled"
						type="line"
						layout={{ "line-cap": "round", "line-join": "round" }}
						paint={{ "line-color": color, "line-width": 5 }}
					/>
				</Source>

				{geometry.waypoints.map((position) => (
					<Marker
						key={position.id}
						longitude={position.lon}
						latitude={position.lat}
					>
						<MapPin variant="waypoint" color={color} title={position.station} />
					</Marker>
				))}
				<Marker longitude={geometry.origin[0]} latitude={geometry.origin[1]}>
					<MapPin
						variant="start"
						color={color}
						label={getStationName(shipment.originStation)}
					/>
				</Marker>
				<Marker
					longitude={geometry.destination[0]}
					latitude={geometry.destination[1]}
				>
					<MapPin
						variant="end"
						color={color}
						label={getStationName(shipment.destinationStation)}
					/>
				</Marker>
				{geometry.currentPosition && (
					<Marker
						longitude={geometry.current[0]}
						latitude={geometry.current[1]}
					>
						<MapPin
							variant="current"
							color={color}
							title={`Сейчас: ${geometry.currentPosition.station}`}
							isPulsing
						/>
					</Marker>
				)}
			</MapView>
		</Card>
	);
}
