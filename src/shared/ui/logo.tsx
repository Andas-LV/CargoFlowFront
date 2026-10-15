import { TrainFront } from "lucide-react";

import { APP_NAME } from "@/shared/config";
import { cn } from "@/shared/lib/utils";

function Logo({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 text-base font-semibold tracking-tight",
				className,
			)}
		>
			<span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
				<TrainFront className="size-4.5" />
			</span>
			{APP_NAME}
		</span>
	);
}

export { Logo };
