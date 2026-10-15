export const MAP_STYLE_URL = {
	light: "https://tiles.openfreemap.org/styles/positron",
	dark: "https://tiles.openfreemap.org/styles/dark",
} as const;

export const MAP_BASE_SOURCE = {
	id: "openmaptiles",
	transportationLayer: "transportation",
	railClass: "rail",
} as const;

export const MAP_FOCUS_AREA = {
	shapeUrl: "/geo/kazakhstan.geojson",
	maskUrl: "/geo/kazakhstan-mask.geojson",
} as const;

export const KAZAKHSTAN_BOUNDS: [[number, number], [number, number]] = [
	[46.5, 40.5],
	[87.4, 55.5],
];

export const MAP_LOCALE = {
	"FullscreenControl.Enter": "Развернуть на весь экран",
	"FullscreenControl.Exit": "Свернуть",
	"NavigationControl.ZoomIn": "Приблизить",
	"NavigationControl.ZoomOut": "Отдалить",
	"AttributionControl.ToggleAttribution": "Источники данных",
	"CooperativeGesturesHandler.WindowsHelpText":
		"Чтобы изменить масштаб, прокручивайте с зажатым Ctrl",
	"CooperativeGesturesHandler.MacHelpText":
		"Чтобы изменить масштаб, прокручивайте с зажатым ⌘",
	"CooperativeGesturesHandler.MobileHelpText":
		"Перемещайте карту двумя пальцами",
};
