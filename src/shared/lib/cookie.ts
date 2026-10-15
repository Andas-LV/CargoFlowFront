import Cookies from "js-cookie";

export const cookie = {
	get: (name: string) => Cookies.get(name),
	set: (name: string, value: string, expires: number | Date) =>
		Cookies.set(name, value, {
			path: "/",
			sameSite: "strict",
			secure: window.location.protocol === "https:",
			expires,
		}),
	remove: (name: string) => Cookies.remove(name, { path: "/" }),
};
