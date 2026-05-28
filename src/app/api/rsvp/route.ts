import { NextRequest } from "next/server";
import { getDB } from "@/lib/db";

const MEALS = new Set(["chicken", "fish", "veggie"]);
const GIFT_INTENTS = new Set(["gift", "money", "presence"]);

export async function POST(request: NextRequest) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const parsed = parseRsvp(body);
	if (!parsed.ok) {
		return Response.json({ error: parsed.error }, { status: 400 });
	}

	const db = await getDB();
	const id = crypto.randomUUID();
	const now = Date.now();

	await db
		.prepare(
			`INSERT INTO rsvps
			(id, created_at, guest_name, email, attending, plus_one_name, meal_choice, dietary_notes, message, gift_intent)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		)
		.bind(
			id,
			now,
			parsed.value.guest_name,
			parsed.value.email,
			parsed.value.attending ? 1 : 0,
			parsed.value.plus_one_name,
			parsed.value.meal_choice,
			parsed.value.dietary_notes,
			parsed.value.message,
			parsed.value.gift_intent,
		)
		.run();

	return Response.json({ ok: true, id });
}

type ParsedRsvp = {
	guest_name: string;
	email: string | null;
	attending: boolean;
	plus_one_name: string | null;
	meal_choice: string | null;
	dietary_notes: string | null;
	message: string | null;
	gift_intent: string | null;
};

function parseRsvp(
	input: unknown,
): { ok: true; value: ParsedRsvp } | { ok: false; error: string } {
	if (typeof input !== "object" || input === null) {
		return { ok: false, error: "Expected JSON object" };
	}
	const v = input as Record<string, unknown>;

	const guest_name = str(v.guest_name)?.trim();
	if (!guest_name) return { ok: false, error: "Name is required" };
	if (guest_name.length > 200) return { ok: false, error: "Name too long" };

	const attending = v.attending === true || v.attending === "yes";

	const email = str(v.email)?.trim() || null;
	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return { ok: false, error: "Invalid email" };
	}

	const plus_one_name = str(v.plus_one_name)?.trim() || null;

	let meal_choice = str(v.meal_choice)?.trim() || null;
	if (meal_choice && !MEALS.has(meal_choice)) {
		return { ok: false, error: "Invalid meal choice" };
	}
	if (!attending) meal_choice = null;

	let gift_intent = str(v.gift_intent)?.trim() || null;
	if (gift_intent && !GIFT_INTENTS.has(gift_intent)) {
		return { ok: false, error: "Invalid gift intent" };
	}
	if (!attending) gift_intent = null;

	const dietary_notes = trunc(str(v.dietary_notes)?.trim(), 500);
	const message = trunc(str(v.message)?.trim(), 1000);

	return {
		ok: true,
		value: {
			guest_name,
			email,
			attending,
			plus_one_name,
			meal_choice,
			dietary_notes,
			message,
			gift_intent,
		},
	};
}

function str(v: unknown): string | undefined {
	return typeof v === "string" ? v : undefined;
}

function trunc(v: string | undefined, max: number): string | null {
	if (!v) return null;
	return v.slice(0, max);
}
