import { getDB, giftIntentLabel, type RsvpRow } from "@/lib/db";

export const metadata = { title: "Admin | RSVPs" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
	const db = await getDB();
	const result = await db
		.prepare("SELECT * FROM rsvps ORDER BY created_at DESC")
		.all<RsvpRow>();
	const rows = result.results ?? [];

	const yes = rows.filter((r) => r.attending === 1);
	const no = rows.filter((r) => r.attending === 0);
	const plusOnes = yes.filter((r) => r.plus_one_name?.trim()).length;

	return (
		<div className="mx-auto max-w-6xl px-6 py-12">
			<header className="flex items-end justify-between border-b-4 border-rule pb-6">
				<div>
					<h1 className="font-serif text-5xl text-foreground">RSVPs</h1>
					<p className="text-muted text-xs uppercase tracking-[0.2em] mt-2">
						{rows.length} total ·{" "}
						<span className="text-accent">{yes.length} attending</span>{" "}
						(+{plusOnes} plus-ones) · {no.length} declined
					</p>
				</div>
				<div className="flex gap-3">
					<a
						href="/admin/songs"
						className="border-4 border-rule bg-surface text-foreground px-5 py-2 text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors"
					>
						Songs →
					</a>
					<a
						href="/api/admin/rsvps.csv"
						className="border-4 border-rule bg-surface text-foreground px-5 py-2 text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors"
					>
						Download CSV
					</a>
				</div>
			</header>

			{rows.length === 0 ? (
				<p className="mt-16 text-center text-muted font-serif italic">
					No RSVPs yet.
				</p>
			) : (
				<div className="mt-8 overflow-x-auto border-4 border-rule bg-surface">
					<table className="min-w-full text-sm">
						<thead className="text-left text-xs uppercase tracking-[0.15em] text-foreground bg-background border-b-4 border-rule">
							<tr>
								<Th>Submitted</Th>
								<Th>Name</Th>
								<Th>Email</Th>
								<Th>Status</Th>
								<Th>Gift</Th>
								<Th>Guest meal</Th>
								<Th>Guest dietary</Th>
								<Th>+1</Th>
								<Th>Message</Th>
							</tr>
						</thead>
						<tbody className="divide-y-2 divide-rule">
							{rows.map((r) => (
								<tr key={r.id} className="align-top text-foreground">
									<Td className="text-muted whitespace-nowrap text-xs">
										{new Date(r.created_at).toLocaleString()}
									</Td>
									<Td className="font-medium">{r.guest_name}</Td>
									<Td className="text-muted">{r.email ?? "-"}</Td>
									<Td>
										{r.attending === 1 ? (
											<span className="border-2 border-rule bg-accent text-white px-2 py-0.5 text-xs uppercase tracking-wider">
												Yes
											</span>
										) : (
											<span className="border-2 border-rule bg-background text-foreground px-2 py-0.5 text-xs uppercase tracking-wider">
												No
											</span>
										)}
									</Td>
									<Td>{giftIntentLabel(r.gift_intent)}</Td>
									<Td className="capitalize">{r.meal_choice ?? "-"}</Td>
									<Td className="max-w-[180px] text-muted">
										{r.dietary_notes ?? "-"}
									</Td>
									<Td className="max-w-[220px]">
										{r.plus_one_name ? (
											<div className="space-y-1">
												<p className="text-foreground">{r.plus_one_name}</p>
												<p className="text-muted text-xs capitalize">
													Meal: {r.plus_one_meal_choice ?? "no preference"}
												</p>
												{r.plus_one_dietary_notes && (
													<p className="text-muted text-xs">
														Dietary: {r.plus_one_dietary_notes}
													</p>
												)}
											</div>
										) : (
											"-"
										)}
									</Td>
									<Td className="max-w-[260px] text-muted">
										{r.message ?? "-"}
									</Td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

function Th({ children }: { children: React.ReactNode }) {
	return <th className="py-3 px-3 font-medium">{children}</th>;
}

function Td({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <td className={`py-3 px-3 ${className}`}>{children}</td>;
}
