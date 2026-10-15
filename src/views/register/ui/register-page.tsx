import Link from "next/link";

import { RegisterForm } from "@/features/register";
import { routes } from "@/shared/config";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";

export function RegisterPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Регистрация</CardTitle>
				<CardDescription>
					Создайте аккаунт, чтобы отправлять грузы по железной дороге
				</CardDescription>
			</CardHeader>
			<CardContent>
				<RegisterForm />
			</CardContent>
			<CardFooter className="text-muted-foreground justify-center text-sm">
				Уже есть аккаунт?&nbsp;
				<Link
					href={routes.login}
					className="text-foreground font-medium underline-offset-4 hover:underline"
				>
					Войти
				</Link>
			</CardFooter>
		</Card>
	);
}
