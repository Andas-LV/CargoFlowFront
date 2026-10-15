const dateTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
	day: "numeric",
	month: "short",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
});

export const formatDateTime = (iso: string) =>
	dateTimeFormatter.format(new Date(iso));

export const formatTime = (iso: string) => timeFormatter.format(new Date(iso));
