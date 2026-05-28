import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const config = {
	matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export async function proxy(request: NextRequest) {
	const { env } = await getCloudflareContext({ async: true });
	const expected = env.ADMIN_PASSWORD;

	const auth = request.headers.get("authorization");
	if (auth?.startsWith("Basic ")) {
		const decoded = atob(auth.slice(6));
		const sep = decoded.indexOf(":");
		const password = sep >= 0 ? decoded.slice(sep + 1) : decoded;
		if (expected && password === expected) {
			return NextResponse.next();
		}
	}

	return new NextResponse("Authentication required", {
		status: 401,
		headers: {
			"WWW-Authenticate": 'Basic realm="Wedding admin", charset="UTF-8"',
		},
	});
}
