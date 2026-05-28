import { site } from "@/lib/site";

export const metadata = {
	title: `Schedule | ${site.partnerOne} & ${site.partnerTwo}`,
};

const events = [
	{
		time: "4:00 PM",
		title: "Ceremony",
		location: site.venueName,
		details: "Arrival from 3:30 PM. Seating begins at 3:45 PM.",
	},
	{
		time: "5:00 PM",
		title: "Cocktail Hour",
		location: "Garden Terrace",
		details: "Drinks and hors d'oeuvres before dinner.",
	},
	{
		time: "6:30 PM",
		title: "Dinner & Toasts",
		location: "Main Hall",
		details: "Plated dinner. Please indicate meal preferences in your RSVP.",
	},
	{
		time: "8:30 PM",
		title: "Dancing",
		location: "Main Hall",
		details: "Until midnight.",
	},
];

export default function SchedulePage() {
	return (
		<div className="mx-auto max-w-2xl px-6 py-20">
			<header className="text-center">
				<p className="font-serif italic text-accent uppercase tracking-[0.3em] text-xs">
					{site.weddingDateDisplay}
				</p>
				<h1 className="font-serif text-5xl sm:text-6xl mt-4 text-foreground">
					Schedule
				</h1>
				<div className="mt-6 mx-auto w-24 border-t-4 border-accent" />

				<p className="mt-8 text-foreground">
					<a
						href={site.venueMapsUrl}
						target="_blank"
						rel="noreferrer"
						className="font-serif text-xl underline decoration-accent decoration-4 underline-offset-[6px] hover:text-accent transition-colors"
					>
						{site.venueName}
					</a>
					<span className="block text-xs mt-2 uppercase tracking-[0.2em] text-muted">
						{site.venueAddress}
					</span>
				</p>
			</header>

			<div className="mt-16 border-y-4 border-rule divide-y-2 divide-rule">
				{events.map((e) => (
					<div
						key={e.title}
						className="grid grid-cols-[110px_1fr] gap-6 py-6 items-baseline px-2"
					>
						<p className="font-serif text-2xl text-accent">{e.time}</p>
						<div>
							<h2 className="font-serif text-2xl text-foreground">{e.title}</h2>
							<p className="text-muted text-xs mt-1 uppercase tracking-[0.2em]">
								{e.location}
							</p>
							<p className="text-foreground/80 mt-3 text-sm leading-relaxed">
								{e.details}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
