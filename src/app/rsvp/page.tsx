import { site } from "@/lib/site";
import { RsvpForm } from "./RsvpForm";

export const metadata = {
	title: `RSVP | ${site.partnerOne} & ${site.partnerTwo}`,
};

export default function RsvpPage() {
	return (
		<div className="mx-auto max-w-xl px-6 py-20">
			<header className="text-center">
				<p className="font-serif italic text-accent uppercase tracking-[0.3em] text-xs">
					Kindly reply by {site.rsvpDeadlineDisplay}
				</p>
				<h1 className="font-serif text-5xl sm:text-6xl mt-4 text-foreground">
					RSVP
				</h1>
				<div className="mt-6 mx-auto w-24 border-t-4 border-accent" />
			</header>

			<div className="mt-12 border-4 border-rule bg-surface p-8">
				<RsvpForm />
			</div>
		</div>
	);
}
