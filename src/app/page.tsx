import Link from "next/link";
import { site } from "@/lib/site";

export default function Home() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-24 text-center">
			<p className="font-serif italic text-accent tracking-[0.3em] uppercase text-xs">
				We&apos;re getting married
			</p>

			<h1 className="font-serif text-7xl sm:text-8xl mt-8 leading-[0.95] text-foreground">
				{site.partnerOne}
				<span className="block font-serif italic text-accent my-3 text-5xl sm:text-6xl">
					&amp;
				</span>
				{site.partnerTwo}
			</h1>

			<div className="mt-12 inline-flex flex-col items-center gap-2 border-y-4 border-rule py-5 px-10">
				<p className="font-serif text-2xl text-foreground">
					{site.weddingDateDisplay}
				</p>
				<p className="text-muted text-xs uppercase tracking-[0.25em]">
					{site.venueName}
				</p>
			</div>

			<div className="mt-12 flex justify-center gap-4">
				<Link
					href="/rsvp"
					className="border-4 border-rule bg-accent px-10 py-3 text-white text-xs tracking-[0.25em] uppercase font-medium hover:bg-accent-dark transition-colors"
				>
					RSVP
				</Link>
				<Link
					href="/schedule"
					className="border-4 border-rule bg-surface px-10 py-3 text-foreground text-xs tracking-[0.25em] uppercase font-medium hover:bg-accent hover:text-white transition-colors"
				>
					Schedule
				</Link>
			</div>

			<p className="mt-14 text-muted text-xs uppercase tracking-[0.25em]">
				Please respond by{" "}
				<span className="text-accent">{site.rsvpDeadlineDisplay}</span>
			</p>
		</div>
	);
}
