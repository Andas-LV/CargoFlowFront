import { TelegramSettings } from "@/widgets/telegram-settings";
import { PageHeader } from "@/shared/ui/page-header";

export function SettingsPage() {
	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
			<PageHeader
				title="Настройки"
				description="Управляйте уведомлениями о заявках"
			/>
			<TelegramSettings />
		</div>
	);
}
