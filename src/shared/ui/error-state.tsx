import { RotateCw, TriangleAlert } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";

interface ErrorStateProps {
	title?: string;
	message: string;
	onRetry?: () => void;
	isRetrying?: boolean;
	className?: string;
}

function ErrorState({
	title = "Не удалось загрузить данные",
	message,
	onRetry,
	isRetrying,
	className,
}: ErrorStateProps) {
	return (
		<EmptyState
			icon={TriangleAlert}
			title={title}
			description={message}
			className={className}
			action={
				onRetry && (
					<Button variant="outline" onClick={onRetry} disabled={isRetrying}>
						<RotateCw className={isRetrying ? "animate-spin" : undefined} />
						Повторить
					</Button>
				)
			}
		/>
	);
}

export { ErrorState };
