import { toApiError } from "./api-error";

type StatusMessages = Partial<Record<number, string>>;

const KNOWN_MESSAGES: ReadonlyArray<readonly [RegExp, string]> = [
	[/invalid email or password/i, "Неверный email или пароль"],
	[/email already registered/i, "Этот email уже зарегистрирован"],
	[/email is not valid/i, "Некорректный email"],
	[/password must be at least/i, "Пароль должен быть не короче 8 символов"],
	[
		/origin and destination must differ/i,
		"Станции отправления и назначения не должны совпадать",
	],
	[/invalid status transition/i, "Недопустимая смена статуса"],
	[/station is required/i, "Укажите станцию"],
	[/unknown origin station/i, "Станция отправления не найдена в справочнике"],
	[
		/unknown destination station/i,
		"Станция назначения не найдена в справочнике",
	],
	[/unknown station/i, "Станция не найдена в справочнике"],
	[/shipment not found/i, "Заявка не найдена"],
];

const STATUS_MESSAGES: StatusMessages = {
	401: "Сессия истекла, войдите снова",
	404: "Не найдено",
	409: "Конфликт данных",
	429: "Слишком много запросов, попробуйте через минуту",
	503: "Сервис временно недоступен",
};

const FALLBACK_MESSAGE = "Что-то пошло не так, попробуйте ещё раз";
const NETWORK_MESSAGE = "Нет соединения с сервером";
const SERVER_MESSAGE = "Сервис временно недоступен";

export const getErrorMessage = (
	error: unknown,
	overrides: StatusMessages = {},
): string => {
	const { status, message } = toApiError(error);

	const override = overrides[status];
	if (override) return override;

	const known = KNOWN_MESSAGES.find(([pattern]) => pattern.test(message));
	if (known) return known[1];

	const byStatus = STATUS_MESSAGES[status];
	if (byStatus) return byStatus;

	if (status === 0) return NETWORK_MESSAGE;
	if (status >= 500) return SERVER_MESSAGE;
	if (status === 400 && message) return message;

	return FALLBACK_MESSAGE;
};
