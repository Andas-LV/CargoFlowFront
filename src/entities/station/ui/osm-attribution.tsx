import { cn } from "@/shared/lib/utils";

export function OsmAttribution({ className }: { className?: string }) {
	return (
		<p className={cn("text-muted-foreground text-xs", className)}>
			Справочник станций: ©{" "}
			<a
				href="https://www.openstreetmap.org/copyright"
				target="_blank"
				rel="noopener noreferrer"
				className="hover:text-foreground underline underline-offset-2"
			>
				OpenStreetMap contributors
			</a>
		</p>
	);
}
