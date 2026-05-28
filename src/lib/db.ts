import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDB(): Promise<D1Database> {
	const { env } = await getCloudflareContext({ async: true });
	return env.DB;
}

export type RsvpRow = {
	id: string;
	created_at: number;
	guest_name: string;
	email: string | null;
	attending: number;
	plus_one_name: string | null;
	meal_choice: string | null;
	dietary_notes: string | null;
	message: string | null;
	gift_intent: string | null;
};

export type GiftIntent = "gift" | "money" | "presence";

export type SongRow = {
	id: string;
	created_at: number;
	submitter_name: string | null;
	original_url: string;
	title: string | null;
	artist: string | null;
	artwork_url: string | null;
	odesli_page_url: string | null;
	platforms_json: string | null;
};

export function giftIntentLabel(g: string | null): string {
	switch (g) {
		case "gift":
			return "Bringing a gift";
		case "money":
			return "Bringing money";
		case "presence":
			return "Presence is the gift";
		default:
			return "-";
	}
}
