import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
	{ href: "/", label: "Home" },
	{ href: "/story", label: "Our Story" },
	{ href: "/schedule", label: "Schedule" },
	{ href: "/songs", label: "Playlist" },
	{ href: "/rsvp", label: "RSVP" },
];

export function SiteHeader() {
	return (
		<header className="border-b-4 border-rule bg-background/95 backdrop-blur sticky top-0 z-10">
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				<Link
					href="/"
					className="font-serif text-2xl tracking-wide text-foreground"
				>
					{site.partnerOne}{" "}
					<span className="text-accent italic">&amp;</span>{" "}
					{site.partnerTwo}
				</Link>
				<nav className="flex gap-6 text-xs uppercase tracking-[0.2em] text-foreground">
					{nav.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="border-b-2 border-transparent hover:border-accent transition-colors py-1"
						>
							{item.label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
