"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";

function PasswordInput({
	className,
	...props
}: Omit<ComponentProps<typeof Input>, "type">) {
	const [isVisible, setIsVisible] = useState(false);
	const Icon = isVisible ? EyeOff : Eye;

	return (
		<div className="relative">
			<Input
				type={isVisible ? "text" : "password"}
				className={cn("pr-10", className)}
				{...props}
			/>
			<button
				type="button"
				onClick={() => setIsVisible((value) => !value)}
				aria-label={isVisible ? "Скрыть пароль" : "Показать пароль"}
				className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-md outline-none focus-visible:ring-[3px]"
			>
				<Icon className="size-4" />
			</button>
		</div>
	);
}

export { PasswordInput };
