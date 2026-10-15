import { useTheme } from "next-themes";

const MAP_PALETTE = {
	light: {
		background: "#ffffff",
		foreground: "#18181b",
		muted: "#71717a",
		rail: "#71717a",
		focus: "#00a3bf",
		focusFillOpacity: 0.07,
		maskOpacity: 0.55,
	},
	dark: {
		background: "#18181b",
		foreground: "#fafafa",
		muted: "#a1a1aa",
		rail: "#a1a1aa",
		focus: "#22c7e3",
		focusFillOpacity: 0.08,
		maskOpacity: 0.6,
	},
} as const;

export const useMapPalette = () => {
	const { resolvedTheme } = useTheme();
	const scheme = resolvedTheme === "dark" ? "dark" : "light";

	return { scheme, ...MAP_PALETTE[scheme] } as const;
};
