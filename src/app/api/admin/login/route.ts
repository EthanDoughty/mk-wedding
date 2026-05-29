import { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(request: NextRequest) {
	const { env } = await getCloudflareContext({ async: true });
	const form = await request.formData();
	const password = String(form.get("password") ?? "");

	const origin = new URL(request.url).origin;

	if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
		return new Response(null, {
			status: 303,
			headers: { Location: `${origin}/admin/login?error=1` },
		});
	}

	return new Response(null, {
		status: 303,
		headers: {
			Location: `${origin}/admin`,
			"Set-Cookie": `${ADMIN_COOKIE}=${encodeURIComponent(env.ADMIN_PASSWORD)}; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=${ADMIN_COOKIE_MAX_AGE}`,
		},
	});
}
