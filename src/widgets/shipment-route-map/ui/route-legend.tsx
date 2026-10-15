import type { CSSProperties } from "react";

interface RouteLegendProps {
	color: string;
	hasRemaining: boolean;
}

export function RouteLegend({ color, hasRemaining }: RouteLegendProps) {
	return (
		<ul
			style={{ "--route": color } as CSSProperties}
			className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
		>
			<li className="flex items-center gap-2">
				<span className="h-1 w-5 rounded-full bg-(--route)" />
				Пройдено
			</li>
			{hasRemaining && (
				<li className="flex items-center gap-2">
					<span className="h-0 w-5 border-t-2 border-dashed border-(--route)" />
					Осталось
				</li>
			)}
		</ul>
	);
}
