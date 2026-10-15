import Link from "next/link";

import { LoginForm } from "@/features/login";
import { routes } from "@/shared/config";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";

export function LoginPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Вход</CardTitle>
				<CardDescription>
					Войдите, чтобы управлять заявками на перевозку
				</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm />
			</CardContent>
			<CardFooter className="text-muted-foreground justify-center text-sm">
				Нет аккаунта?&nbsp;
				<Link
					href={routes.register}
					className="text-foreground font-medium underline-offset-4 hover:underline"
				>
					Зарегистрироваться
				</Link>
			</CardFooter>
		</Card>
	);
}
