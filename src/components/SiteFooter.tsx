import { site } from "@/lib/site";

export function SiteFooter() {
	return (
		<footer className="border-t-4 border-rule bg-background mt-24">
			<div className="mx-auto max-w-5xl px-6 py-10 text-center text-sm text-foreground">
				<p className="font-serif italic text-lg">
					{site.partnerOne}{" "}
					<span className="text-accent">&amp;</span>{" "}
					{site.partnerTwo} · {site.weddingDateDisplay}
				</p>
				<p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted">
					{site.hashtag}
				</p>
			</div>
		</footer>
	);
}
