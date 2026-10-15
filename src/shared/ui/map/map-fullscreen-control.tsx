"use client";

import { useEffect } from "react";
import {
	useControl,
	useMap,
	type ControlPosition,
} from "react-map-gl/maplibre";

interface MapFullscreenControlProps {
	containerId: string;
	position?: ControlPosition;
	onToggle: (isFullscreen: boolean) => void;
}

export function MapFullscreenControl({
	containerId,
	position = "top-right",
	onToggle,
}: MapFullscreenControlProps) {
	const { current: mapRef } = useMap();
	const control = useControl(
		({ mapLib }) =>
			new mapLib.FullscreenControl({
				container: document.getElementById(containerId) ?? undefined,
			}),
		{ position },
	);

	useEffect(() => {
		const gestures = mapRef?.getMap().cooperativeGestures;
		if (!gestures) return;

		const handleStart = () => {
			gestures.disable();
			onToggle(true);
		};
		const handleEnd = () => {
			gestures.enable();
			onToggle(false);
		};

		control.on("fullscreenstart", handleStart);
		control.on("fullscreenend", handleEnd);
		return () => {
			control.off("fullscreenstart", handleStart);
			control.off("fullscreenend", handleEnd);
		};
	}, [control, mapRef, onToggle]);

	return null;
}
