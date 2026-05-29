import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const ADMIN_COOKIE = "mk_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function isAdmin(): Promise<boolean> {
	const { env } = await getCloudflareContext({ async: true });
	const cookieStore = await cookies();
	const session = cookieStore.get(ADMIN_COOKIE)?.value;
	return !!env.ADMIN_PASSWORD && session === env.ADMIN_PASSWORD;
}

export async function requireAdmin(): Promise<void> {
	if (!(await isAdmin())) {
		redirect("/admin/login");
	}
}
