import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";

function Container({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn("mx-auto w-full max-w-5xl px-4 sm:px-6", className)}
			{...props}
		/>
	);
}

export { Container };
