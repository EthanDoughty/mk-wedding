import { site } from "@/lib/site";

export const metadata = {
	title: `Schedule | ${site.partnerOne} & ${site.partnerTwo}`,
};

export default function SchedulePage() {
	return (
		<div className="mx-auto max-w-2xl px-6 py-20">
			<header className="text-center">
				<p className="font-serif italic text-accent uppercase tracking-[0.3em] text-xs">
					Day of
				</p>
				<h1 className="font-serif text-5xl sm:text-6xl mt-4 text-foreground">
					Schedule
				</h1>
				<div className="mt-6 mx-auto w-24 border-t-4 border-accent" />
			</header>

			<div className="mt-20 border-y-4 border-rule py-16 text-center">
				<p className="font-serif italic text-muted uppercase tracking-[0.3em] text-xs">
					To be determined
				</p>
				<p className="font-serif text-6xl text-foreground mt-4">TBD</p>
				<p className="mt-6 text-muted text-sm">
					Check back closer to the date.
				</p>
			</div>
		</div>
	);
}
