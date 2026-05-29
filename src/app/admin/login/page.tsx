export const metadata = { title: "Admin | Login" };

export default async function AdminLoginPage({
	searchParams,
}: {
	searchParams: Promise<{ error?: string }>;
}) {
	const { error } = await searchParams;
	return (
		<div className="mx-auto max-w-md px-6 py-24">
			<header className="text-center">
				<p className="font-serif italic text-accent uppercase tracking-[0.3em] text-xs">
					Restricted
				</p>
				<h1 className="font-serif text-5xl mt-4 text-foreground">Admin</h1>
				<div className="mt-6 mx-auto w-24 border-t-4 border-accent" />
			</header>

			<form
				method="POST"
				action="/api/admin/login"
				className="mt-12 border-4 border-rule bg-surface p-8 space-y-6"
			>
				<div>
					<label
						htmlFor="password"
						className="block text-xs font-medium text-foreground uppercase tracking-[0.2em] mb-2"
					>
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						autoFocus
						className="w-full border-2 border-rule bg-background text-foreground px-3 py-2 text-sm focus:border-accent focus:outline-none"
					/>
				</div>

				{error && (
					<p className="text-sm text-white bg-accent border-2 border-rule px-3 py-2">
						Wrong password.
					</p>
				)}

				<button
					type="submit"
					className="w-full border-4 border-rule bg-accent px-8 py-3 text-white text-xs tracking-[0.25em] uppercase font-medium hover:bg-accent-dark transition-colors"
				>
					Enter
				</button>
			</form>
		</div>
	);
}
