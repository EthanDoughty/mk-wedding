// Augments `CloudflareEnv` (declared by @opennextjs/cloudflare) with this
// project's bindings and vars. Read via `getCloudflareContext().env`.
declare global {
	interface CloudflareEnv {
		DB: D1Database;
		ADMIN_PASSWORD: string;
	}
}

export {};
