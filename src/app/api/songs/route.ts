import { NextRequest } from "next/server";
import { getDB } from "@/lib/db";

const ODESLI_URL = "https://api.song.link/v1-alpha.1/links";

type OdesliEntity = {
	title?: string;
	artistName?: string;
	thumbnailUrl?: string;
	apiProvider?: string;
	type?: string;
};

type OdesliResponse = {
	entityUniqueId: string;
	pageUrl?: string;
	entitiesByUniqueId: Record<string, OdesliEntity>;
	linksByPlatform?: Record<string, { url: string }>;
};

export async function POST(request: NextRequest) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const parsed = parseInput(body);
	if (!parsed.ok) {
		return Response.json({ error: parsed.error }, { status: 400 });
	}

	const odesliRes = await fetch(
		`${ODESLI_URL}?url=${encodeURIComponent(parsed.value.url)}`,
		{ headers: { Accept: "application/json" } },
	);
	if (!odesliRes.ok) {
		return Response.json(
			{
				error:
					"Couldn't find that song. Make sure it's a direct link to a track on Spotify, Apple Music, YouTube, Tidal, or SoundCloud.",
			},
			{ status: 400 },
		);
	}

	const odesli = (await odesliRes.json()) as OdesliResponse;
	const entity = odesli.entitiesByUniqueId?.[odesli.entityUniqueId];
	if (!entity) {
		return Response.json(
			{ error: "Couldn't read song data. Try a direct track link." },
			{ status: 400 },
		);
	}

	const platforms_json = JSON.stringify(odesli.linksByPlatform ?? {});

	const db = await getDB();
	const id = crypto.randomUUID();
	const now = Date.now();
	await db
		.prepare(
			`INSERT INTO songs
			(id, created_at, submitter_name, original_url, title, artist, artwork_url, odesli_page_url, platforms_json)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		)
		.bind(
			id,
			now,
			parsed.value.submitter_name,
			parsed.value.url,
			entity.title ?? null,
			entity.artistName ?? null,
			entity.thumbnailUrl ?? null,
			odesli.pageUrl ?? null,
			platforms_json,
		)
		.run();

	return Response.json({
		ok: true,
		song: {
			title: entity.title ?? null,
			artist: entity.artistName ?? null,
			artwork_url: entity.thumbnailUrl ?? null,
			odesli_page_url: odesli.pageUrl ?? null,
		},
	});
}

type ParsedInput = {
	url: string;
	submitter_name: string | null;
};

function parseInput(
	input: unknown,
): { ok: true; value: ParsedInput } | { ok: false; error: string } {
	if (typeof input !== "object" || input === null) {
		return { ok: false, error: "Expected JSON object" };
	}
	const v = input as Record<string, unknown>;

	const rawUrl = typeof v.url === "string" ? v.url.trim() : "";
	if (!rawUrl) return { ok: false, error: "Paste a link to a song." };
	if (rawUrl.length > 2000) return { ok: false, error: "Link too long" };
	let parsedUrl: URL;
	try {
		parsedUrl = new URL(rawUrl);
	} catch {
		return { ok: false, error: "That doesn't look like a valid URL." };
	}
	if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
		return { ok: false, error: "Link must be http or https." };
	}

	let name: string | null =
		typeof v.submitter_name === "string" ? v.submitter_name.trim() : "";
	if (name && name.length > 200) name = name.slice(0, 200);
	if (!name) name = null;

	return { ok: true, value: { url: parsedUrl.toString(), submitter_name: name } };
}
