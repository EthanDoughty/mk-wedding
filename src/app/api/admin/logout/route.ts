import { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
	const origin = new URL(request.url).origin;
	return new Response(null, {
		status: 303,
		headers: {
			Location: `${origin}/admin/login`,
			"Set-Cookie": `${ADMIN_COOKIE}=; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=0`,
		},
	});
}
