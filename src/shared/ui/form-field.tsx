import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/label";

interface FormFieldProps {
	label: ReactNode;
	htmlFor: string;
	error?: string;
	hint?: ReactNode;
	className?: string;
	children: ReactNode;
}

export const fieldMessageId = (htmlFor: string) => `${htmlFor}-message`;

function FormField({
	label,
	htmlFor,
	error,
	hint,
	className,
	children,
}: FormFieldProps) {
	const message = error ?? hint;

	return (
		<div data-slot="form-field" className={cn("grid gap-2", className)}>
			<Label htmlFor={htmlFor} className={cn(error && "text-destructive")}>
				{label}
			</Label>
			{children}
			{message && (
				<p
					id={fieldMessageId(htmlFor)}
					role={error ? "alert" : undefined}
					className={cn(
						"text-xs",
						error ? "text-destructive" : "text-muted-foreground",
					)}
				>
					{message}
				</p>
			)}
		</div>
	);
}

export { FormField };
