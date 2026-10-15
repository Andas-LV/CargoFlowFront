import {
	ArrowRightLeft,
	MapPin,
	PackagePlus,
	type LucideIcon,
} from "lucide-react";

interface NotificationExample {
	icon: LucideIcon;
	title: string;
	example: string;
}

const NOTIFICATION_EXAMPLES: NotificationExample[] = [
	{
		icon: PackagePlus,
		title: "Заявка создана",
		example: "Заявка (вагон): Astana-1 → Almaty-2",
	},
	{
		icon: ArrowRightLeft,
		title: "Статус изменён",
		example: "Создана → В пути",
	},
	{
		icon: MapPin,
		title: "Груз перемещён",
		example: "Отмечена станция Karaganda",
	},
];

export function NotificationExamples() {
	return (
		<ul className="grid gap-3 sm:grid-cols-3">
			{NOTIFICATION_EXAMPLES.map(({ icon: Icon, title, example }) => (
				<li
					key={title}
					className="bg-muted/50 flex flex-col gap-2 rounded-lg p-3"
				>
					<Icon className="text-muted-foreground size-4" />
					<span className="text-sm font-medium">{title}</span>
					<span className="text-muted-foreground text-xs">{example}</span>
				</li>
			))}
		</ul>
	);
}
