export interface TelegramStatus {
	linked: boolean;
	linkedAt?: string | null;
}

export interface TelegramLink {
	url: string;
	expiresAt: string;
}
