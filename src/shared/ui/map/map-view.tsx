"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import {
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
	type ReactNode,
} from "react";
import Map, {
	AttributionControl,
	Layer,
	NavigationControl,
	type MapProps,
	type MapRef,
} from "react-map-gl/maplibre";

import {
	KAZAKHSTAN_BOUNDS,
	MAP_BASE_SOURCE,
	MAP_LOCALE,
	MAP_STYLE_URL,
} from "@/shared/config";
import type { LngLatBounds } from "@/shared/lib/geo";
import { cn } from "@/shared/lib/utils";
import { MapFocusArea } from "./map-focus-area";
import { MapFullscreenControl } from "./map-fullscreen-control";
import { useMapPalette } from "./use-map-palette";

interface MapViewProps extends Omit<
	MapProps,
	"mapStyle" | "attributionControl" | "initialViewState" | "style"
> {
	bounds?: LngLatBounds | null;
	boundsPadding?: number | PaddingOptions;
	boundsMaxZoom?: number;
	className?: string;
	overlay?: ReactNode;
	children?: ReactNode;
}

type PaddingOptions = Record<"top" | "right" | "bottom" | "left", number>;

const FIT_BOUNDS_DURATION_MS = 700;
const DEFAULT_BOUNDS_PADDING: PaddingOptions = {
	top: 56,
	right: 64,
	bottom: 72,
	left: 64,
};

export function MapView({
	bounds,
	boundsPadding = DEFAULT_BOUNDS_PADDING,
	boundsMaxZoom = 8,
	className,
	overlay,
	children,
	...mapProps
}: MapViewProps) {
	const containerId = useId();
	const mapRef = useRef<MapRef>(null);
	const palette = useMapPalette();
	const [isFullscreen, setIsFullscreen] = useState(false);

	const fitToBounds = useCallback(() => {
		if (!bounds) return;
		mapRef.current?.fitBounds(bounds, {
			padding: boundsPadding,
			maxZoom: boundsMaxZoom,
			duration: FIT_BOUNDS_DURATION_MS,
		});
	}, [bounds, boundsPadding, boundsMaxZoom]);

	useEffect(fitToBounds, [fitToBounds]);

	const handleFullscreenToggle = useCallback(
		(nextIsFullscreen: boolean) => {
			setIsFullscreen(nextIsFullscreen);
			mapRef.current?.once("resize", fitToBounds);
		},
		[fitToBounds],
	);

	return (
		<div
			id={containerId}
			data-fullscreen={isFullscreen}
			className={cn(
				"group/map bg-muted relative isolate overflow-hidden rounded-xl border",
				className,
				"data-[fullscreen=true]:rounded-none data-[fullscreen=true]:border-0",
			)}
		>
			<Map
				ref={mapRef}
				{...mapProps}
				mapStyle={MAP_STYLE_URL[palette.scheme]}
				initialViewState={{
					bounds: bounds ?? KAZAKHSTAN_BOUNDS,
					fitBoundsOptions: { padding: boundsPadding, maxZoom: boundsMaxZoom },
				}}
				attributionControl={false}
				dragRotate={false}
				touchPitch={false}
				cooperativeGestures
				locale={MAP_LOCALE}
				style={{ width: "100%", height: "100%" }}
			>
				<Layer
					id="cf-railways"
					type="line"
					source={MAP_BASE_SOURCE.id}
					source-layer={MAP_BASE_SOURCE.transportationLayer}
					filter={["==", ["get", "class"], MAP_BASE_SOURCE.railClass]}
					layout={{ "line-cap": "round", "line-join": "round" }}
					paint={{
						"line-color": palette.rail,
						"line-width": ["interpolate", ["linear"], ["zoom"], 6, 1, 12, 2.5],
						"line-dasharray": [3, 2],
					}}
				/>
				<MapFocusArea />
				<MapFullscreenControl
					containerId={containerId}
					onToggle={handleFullscreenToggle}
				/>
				<NavigationControl position="top-right" showCompass={false} />
				<AttributionControl compact />
				{children}
			</Map>
			{overlay}
		</div>
	);
}
