export type LngLat = [longitude: number, latitude: number];
export type LngLatBounds = [southWest: LngLat, northEast: LngLat];

export const toLngLat = ({
	lat,
	lon,
}: {
	lat: number;
	lon: number;
}): LngLat => [lon, lat];

export const isSameLngLat = ([lngA, latA]: LngLat, [lngB, latB]: LngLat) =>
	lngA === lngB && latA === latB;

export const getBounds = (points: readonly LngLat[]): LngLatBounds | null => {
	if (points.length === 0) return null;

	const longitudes = points.map(([lng]) => lng);
	const latitudes = points.map(([, lat]) => lat);

	return [
		[Math.min(...longitudes), Math.min(...latitudes)],
		[Math.max(...longitudes), Math.max(...latitudes)],
	];
};

interface ArcOptions {
	curvature?: number;
	segments?: number;
}

export const buildArc = (
	[fromLng, fromLat]: LngLat,
	[toLng, toLat]: LngLat,
	{ curvature = 0.18, segments = 48 }: ArcOptions = {},
): LngLat[] => {
	const controlLng = (fromLng + toLng) / 2 - (toLat - fromLat) * curvature;
	const controlLat = (fromLat + toLat) / 2 + (toLng - fromLng) * curvature;

	return Array.from({ length: segments + 1 }, (_, index) => {
		const t = index / segments;
		const u = 1 - t;
		return [
			u * u * fromLng + 2 * u * t * controlLng + t * t * toLng,
			u * u * fromLat + 2 * u * t * controlLat + t * t * toLat,
		];
	});
};
