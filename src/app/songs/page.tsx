import { site } from "@/lib/site";
import { SongForm } from "./SongForm";

export const metadata = {
	title: `Bangers, Bops, and Jams | ${site.partnerOne} & ${site.partnerTwo}`,
};

export default function SongsPage() {
	return (
		<div className="mx-auto max-w-xl px-6 py-20">
			<header className="text-center">
				<p className="font-serif italic text-accent uppercase tracking-[0.3em] text-xs">
					Help us build the playlist
				</p>
				<h1 className="font-serif text-5xl sm:text-6xl mt-4 text-foreground">
					Bangers, Bops, and Jams
				</h1>
				<div className="mt-6 mx-auto w-24 border-t-4 border-accent" />
				<p className="mt-8 text-foreground/80 leading-relaxed">
					Paste a link from <em>any</em> music service: Spotify, Apple Music,
					YouTube, Tidal, SoundCloud. Submit as many as you want.
				</p>
			</header>

			<div className="mt-12 border-4 border-rule bg-surface p-8">
				<SongForm />
			</div>
		</div>
	);
}
