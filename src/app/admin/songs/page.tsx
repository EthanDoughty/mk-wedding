import { getDB, type SongRow } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Admin | Songs" };
export const dynamic = "force-dynamic";

type Platforms = Record<string, { url: string } | undefined>;

const PLATFORM_ORDER = [
	"spotify",
	"appleMusic",
	"youtube",
	"youtubeMusic",
	"tidal",
	"soundcloud",
	"amazonMusic",
] as const;

const PLATFORM_LABEL: Record<string, string> = {
	spotify: "Spotify",
	appleMusic: "Apple Music",
	youtube: "YouTube",
	youtubeMusic: "YouTube Music",
	tidal: "Tidal",
	soundcloud: "SoundCloud",
	amazonMusic: "Amazon",
};

export default async function AdminSongsPage() {
	await requireAdmin();
	const db = await getDB();
	const { results = [] } = await db
		.prepare("SELECT * FROM songs ORDER BY created_at DESC")
		.all<SongRow>();

	return (
		<div className="mx-auto max-w-5xl px-6 py-12">
			<header className="flex items-end justify-between border-b-4 border-rule pb-6">
				<div>
					<h1 className="font-serif text-5xl text-foreground">Songs</h1>
					<p className="text-muted text-xs uppercase tracking-[0.2em] mt-2">
						{results.length} submission{results.length === 1 ? "" : "s"}
					</p>
				</div>
				<a
					href="/admin"
					className="border-4 border-rule bg-surface text-foreground px-5 py-2 text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors"
				>
					← RSVPs
				</a>
			</header>

			{results.length === 0 ? (
				<p className="mt-16 text-center text-muted font-serif italic">
					No songs yet.
				</p>
			) : (
				<ul className="mt-8 divide-y-2 divide-rule border-y-4 border-rule">
					{results.map((s) => {
						const platforms = parsePlatforms(s.platforms_json);
						return (
							<li
								key={s.id}
								className="grid grid-cols-[80px_1fr_auto] gap-6 py-5 items-center"
							>
								{s.artwork_url ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={s.artwork_url}
										alt=""
										className="w-20 h-20 object-cover border-2 border-rule"
									/>
								) : (
									<div className="w-20 h-20 border-2 border-rule bg-background" />
								)}
								<div className="min-w-0">
									<p className="font-serif text-xl text-foreground truncate">
										{s.title ?? "(untitled)"}
									</p>
									<p className="text-muted text-sm truncate">
										{s.artist ?? "-"}
									</p>
									<p className="text-muted text-xs uppercase tracking-[0.15em] mt-2">
										{s.submitter_name ?? "Anonymous"}
										<span className="mx-2 text-rule">·</span>
										{new Date(s.created_at).toLocaleDateString()}
									</p>
								</div>
								<div className="flex flex-col gap-1 text-xs uppercase tracking-[0.15em] text-right">
									{PLATFORM_ORDER.map((p) =>
										platforms[p] ? (
											<a
												key={p}
												href={platforms[p]!.url}
												target="_blank"
												rel="noreferrer"
												className="text-accent hover:underline"
											>
												{PLATFORM_LABEL[p] ?? p}
											</a>
										) : null,
									)}
									{s.odesli_page_url && (
										<a
											href={s.odesli_page_url}
											target="_blank"
											rel="noreferrer"
											className="text-muted hover:underline"
										>
											song.link
										</a>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

function parsePlatforms(json: string | null): Platforms {
	if (!json) return {};
	try {
		return JSON.parse(json) as Platforms;
	} catch {
		return {};
	}
}
