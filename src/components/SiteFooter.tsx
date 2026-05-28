export function SiteFooter() {
	return (
		<footer className="border-t-4 border-rule bg-background mt-24">
			<div className="mx-auto max-w-5xl px-6 py-8 text-center">
				<p className="text-[10px] uppercase tracking-[0.3em] text-muted/70">
					Built by Ethan Doughty
					<a
						href="https://github.com/EthanDoughty"
						target="_blank"
						rel="noreferrer"
						className="ml-3 normal-case tracking-wider hover:text-accent transition-colors"
					>
						https://github.com/EthanDoughty
					</a>
				</p>
			</div>
		</footer>
	);
}
