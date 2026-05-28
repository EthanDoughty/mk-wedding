import { getDB, type RsvpRow } from "@/lib/db";

export const dynamic = "force-dynamic";

const HEADERS = [
	"submitted_at",
	"guest_name",
	"email",
	"attending",
	"gift_intent",
	"plus_one_name",
	"meal_choice",
	"dietary_notes",
	"message",
] as const;

export async function GET() {
	const db = await getDB();
	const { results = [] } = await db
		.prepare("SELECT * FROM rsvps ORDER BY created_at DESC")
		.all<RsvpRow>();

	const lines = [HEADERS.join(",")];
	for (const r of results) {
		lines.push(
			[
				new Date(r.created_at).toISOString(),
				r.guest_name,
				r.email ?? "",
				r.attending === 1 ? "yes" : "no",
				r.gift_intent ?? "",
				r.plus_one_name ?? "",
				r.meal_choice ?? "",
				r.dietary_notes ?? "",
				r.message ?? "",
			]
				.map(csvCell)
				.join(","),
		);
	}

	return new Response(lines.join("\n"), {
		headers: {
			"Content-Type": "text/csv; charset=utf-8",
			"Content-Disposition": `attachment; filename="rsvps-${new Date()
				.toISOString()
				.slice(0, 10)}.csv"`,
		},
	});
}

function csvCell(v: string): string {
	if (/[",\n\r]/.test(v)) {
		return `"${v.replace(/"/g, '""')}"`;
	}
	return v;
}
