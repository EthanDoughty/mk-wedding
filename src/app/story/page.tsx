import { site } from "@/lib/site";

export const metadata = {
	title: `Our Story | ${site.partnerOne} & ${site.partnerTwo}`,
};

const chapters = [
	{
		year: "Year One",
		title: "How we met",
		body: "Replace this with the story of how you met. Keep it short, a paragraph is plenty.",
	},
	{
		year: "Year Two",
		title: "Our first trip",
		body: "Another milestone. Photos and memories worth retelling.",
	},
	{
		year: "Year Three",
		title: "The proposal",
		body: "Where, when, and how it happened.",
	},
];

export default function StoryPage() {
	return (
		<div className="mx-auto max-w-2xl px-6 py-20">
			<header className="text-center">
				<p className="font-serif italic text-accent uppercase tracking-[0.3em] text-xs">
					Chapter by chapter
				</p>
				<h1 className="font-serif text-5xl sm:text-6xl mt-4 text-foreground">
					Our Story
				</h1>
				<div className="mt-6 mx-auto w-24 border-t-4 border-accent" />
			</header>

			<div className="mt-16 space-y-10">
				{chapters.map((c) => (
					<article
						key={c.title}
						className="border-l-4 border-rule pl-6 relative"
					>
						<span
							aria-hidden
							className="absolute -left-[10px] top-1 w-4 h-4 bg-accent border-4 border-rule"
						/>
						<p className="font-serif italic text-accent text-xs uppercase tracking-[0.25em]">
							{c.year}
						</p>
						<h2 className="font-serif text-3xl mt-1 text-foreground">
							{c.title}
						</h2>
						<p className="mt-3 text-foreground/80 leading-relaxed">{c.body}</p>
					</article>
				))}
			</div>
		</div>
	);
}
