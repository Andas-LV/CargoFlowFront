import { Layer, Source } from "react-map-gl/maplibre";

import { MAP_FOCUS_AREA } from "@/shared/config";
import { useMapPalette } from "./use-map-palette";

export function MapFocusArea() {
	const palette = useMapPalette();

	return (
		<>
			<Source id="cf-focus-mask" type="geojson" data={MAP_FOCUS_AREA.maskUrl}>
				<Layer
					id="cf-focus-mask"
					type="fill"
					paint={{
						"fill-color": palette.background,
						"fill-opacity": palette.maskOpacity,
					}}
				/>
			</Source>
			<Source id="cf-focus-area" type="geojson" data={MAP_FOCUS_AREA.shapeUrl}>
				<Layer
					id="cf-focus-fill"
					type="fill"
					paint={{
						"fill-color": palette.focus,
						"fill-opacity": palette.focusFillOpacity,
					}}
				/>
				<Layer
					id="cf-focus-glow"
					type="line"
					layout={{ "line-join": "round" }}
					paint={{
						"line-color": palette.focus,
						"line-width": ["interpolate", ["linear"], ["zoom"], 3, 6, 8, 12],
						"line-opacity": 0.15,
						"line-blur": 4,
					}}
				/>
				<Layer
					id="cf-focus-outline"
					type="line"
					layout={{ "line-join": "round" }}
					paint={{
						"line-color": palette.focus,
						"line-width": ["interpolate", ["linear"], ["zoom"], 3, 1.5, 8, 2.5],
					}}
				/>
			</Source>
		</>
	);
}
