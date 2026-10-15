import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";

function Spinner({ className, ...props }: ComponentProps<typeof LoaderCircle>) {
	return (
		<LoaderCircle
			data-slot="spinner"
			role="status"
			aria-label="Загрузка"
			className={cn("size-4 animate-spin", className)}
			{...props}
		/>
	);
}

export { Spinner };
