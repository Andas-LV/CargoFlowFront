import { MapPinOff } from "lucide-react";
import Link from "next/link";

import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";

export default function NotFound() {
	return (
		<main className="flex min-h-dvh items-center justify-center px-4">
			<EmptyState
				icon={MapPinOff}
				title="Страница не найдена"
				description="Такой станции на нашем маршруте нет."
				className="w-full max-w-md"
				action={
					<Button asChild>
						<Link href={routes.shipments}>К заявкам</Link>
					</Button>
				}
			/>
		</main>
	);
}
