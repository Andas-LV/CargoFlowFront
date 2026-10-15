import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import type { TransitionAction } from "../model/transition-actions";

interface TransitionButtonProps {
	action: TransitionAction;
	isPending: boolean;
	disabled: boolean;
	onConfirm: () => void;
}

export function TransitionButton({
	action: { label, icon: Icon, variant, confirmation },
	isPending,
	disabled,
	onConfirm,
}: TransitionButtonProps) {
	const button = (
		<Button
			variant={variant}
			disabled={disabled}
			loading={isPending}
			onClick={confirmation ? undefined : onConfirm}
		>
			<Icon />
			{label}
		</Button>
	);

	if (!confirmation) return button;

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{confirmation.title}</AlertDialogTitle>
					<AlertDialogDescription>
						{confirmation.description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Назад</AlertDialogCancel>
					<AlertDialogAction
						variant={confirmation.isDestructive ? "destructive" : "default"}
						onClick={onConfirm}
					>
						{confirmation.confirmLabel}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
