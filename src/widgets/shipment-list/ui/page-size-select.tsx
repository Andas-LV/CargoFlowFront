import {
	SHIPMENTS_PAGE_SIZES,
	type ShipmentsPageSize,
} from "@/entities/shipment";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";

interface PageSizeSelectProps {
	value: ShipmentsPageSize;
	onChange: (value: ShipmentsPageSize) => void;
}

export function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
	return (
		<label className="text-muted-foreground flex items-center gap-2 text-sm">
			Показывать по
			<Select
				value={String(value)}
				onValueChange={(next) => onChange(Number(next) as ShipmentsPageSize)}
			>
				<SelectTrigger size="sm" aria-label="Количество заявок на странице">
					<SelectValue />
				</SelectTrigger>
				<SelectContent align="end">
					{SHIPMENTS_PAGE_SIZES.map((size) => (
						<SelectItem key={size} value={String(size)}>
							{size}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</label>
	);
}
