"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

import { useLogout } from "@/features/logout";
import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface UserMenuProps {
	email?: string;
}

export function UserMenu({ email }: UserMenuProps) {
	const logout = useLogout();
	const initial = email?.charAt(0).toUpperCase() ?? "?";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full"
					aria-label="Меню пользователя"
				>
					<span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full text-sm font-semibold">
						{initial}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="flex flex-col gap-0.5">
					<span className="text-muted-foreground text-xs font-normal">
						Вы вошли как
					</span>
					<span className="truncate">{email ?? "Пользователь"}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href={routes.settings}>
						<Settings />
						Настройки
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem variant="destructive" onSelect={logout}>
					<LogOut />
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
