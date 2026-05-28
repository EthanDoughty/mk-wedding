"use client";

import { useState } from "react";

type Status =
	| { kind: "idle" }
	| { kind: "submitting" }
	| { kind: "success" }
	| { kind: "error"; message: string };

type Option = "gift" | "money" | "presence" | "no";

const OPTIONS: { key: Option; label: string; variant: "emerald" | "crimson" }[] =
	[
		{ key: "gift", label: "I'm bringing you shit", variant: "emerald" },
		{ key: "money", label: "I'm bringing you money", variant: "emerald" },
		{ key: "presence", label: "My presence is the gift", variant: "emerald" },
		{ key: "no", label: "Nah, I'm good", variant: "crimson" },
	];

export function RsvpForm() {
	const [option, setOption] = useState<Option | null>(null);
	const [status, setStatus] = useState<Status>({ kind: "idle" });
	const attending = option !== null && option !== "no";

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!option) {
			setStatus({ kind: "error", message: "Please choose an option." });
			return;
		}
		const form = new FormData(e.currentTarget);
		const payload = {
			guest_name: form.get("guest_name"),
			email: form.get("email"),
			attending,
			gift_intent: attending ? option : null,
			plus_one_name: form.get("plus_one_name"),
			meal_choice: form.get("meal_choice"),
			dietary_notes: form.get("dietary_notes"),
			message: form.get("message"),
		};

		setStatus({ kind: "submitting" });
		try {
			const res = await fetch("/api/rsvp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body = (await res.json().catch(() => ({}))) as {
					error?: string;
				};
				setStatus({
					kind: "error",
					message: body.error ?? "Something went wrong. Please try again.",
				});
				return;
			}
			setStatus({ kind: "success" });
		} catch {
			setStatus({
				kind: "error",
				message: "Network error. Please try again.",
			});
		}
	}

	if (status.kind === "success") {
		return (
			<div className="text-center py-6">
				<p className="font-serif italic text-accent text-xs tracking-[0.3em] uppercase">
					Thank you
				</p>
				<p className="font-serif text-4xl mt-3 text-foreground">
					{attending ? "We can’t wait!" : "We’ll miss you."}
				</p>
				<div className="mt-6 mx-auto w-16 border-t-4 border-accent" />
				<p className="mt-6 text-muted text-sm">
					Your response has been recorded.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<Field label="Your name" name="guest_name" required maxLength={200} />
			<Field label="Email" name="email" type="email" />

			<fieldset>
				<legend className="block text-xs font-medium text-foreground uppercase tracking-[0.2em] mb-3">
					Will you attend?
				</legend>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{OPTIONS.map((o) => (
						<OptionPill
							key={o.key}
							selected={option === o.key}
							onClick={() => setOption(o.key)}
							label={o.label}
							variant={o.variant}
						/>
					))}
				</div>
			</fieldset>

			{attending && (
				<>
					<Field
						label="Plus one (full name, if applicable)"
						name="plus_one_name"
					/>

					<div>
						<label className="block text-xs font-medium text-foreground uppercase tracking-[0.2em] mb-2">
							Meal preference
						</label>
						<select
							name="meal_choice"
							defaultValue=""
							className="w-full border-2 border-rule bg-background text-foreground px-3 py-2 text-sm focus:border-accent focus:outline-none"
						>
							<option value="">No preference</option>
							<option value="chicken">Chicken</option>
							<option value="fish">Fish</option>
							<option value="veggie">Vegetarian</option>
						</select>
					</div>

					<Field
						label="Dietary restrictions / allergies"
						name="dietary_notes"
						multiline
						maxLength={500}
					/>
				</>
			)}

			<Field
				label="A note for the couple (optional)"
				name="message"
				multiline
				maxLength={1000}
			/>

			{status.kind === "error" && (
				<p className="text-sm text-white bg-accent border-2 border-rule px-3 py-2">
					{status.message}
				</p>
			)}

			<button
				type="submit"
				disabled={status.kind === "submitting"}
				className="w-full border-4 border-rule bg-accent px-8 py-3 text-white text-xs tracking-[0.25em] uppercase font-medium hover:bg-accent-dark transition-colors disabled:opacity-50"
			>
				{status.kind === "submitting" ? "Sending…" : "Send RSVP"}
			</button>
		</form>
	);
}

function Field({
	label,
	name,
	type = "text",
	required,
	multiline,
	maxLength,
}: {
	label: string;
	name: string;
	type?: string;
	required?: boolean;
	multiline?: boolean;
	maxLength?: number;
}) {
	const base =
		"w-full border-2 border-rule bg-background text-foreground placeholder:text-muted px-3 py-2 text-sm focus:border-accent focus:outline-none";
	return (
		<div>
			<label
				htmlFor={name}
				className="block text-xs font-medium text-foreground uppercase tracking-[0.2em] mb-2"
			>
				{label}
				{required && <span className="text-accent ml-1">*</span>}
			</label>
			{multiline ? (
				<textarea
					id={name}
					name={name}
					rows={3}
					maxLength={maxLength}
					className={base}
				/>
			) : (
				<input
					id={name}
					name={name}
					type={type}
					required={required}
					maxLength={maxLength}
					className={base}
				/>
			)}
		</div>
	);
}

function OptionPill({
	selected,
	onClick,
	label,
	variant,
}: {
	selected: boolean;
	onClick: () => void;
	label: string;
	variant: "emerald" | "crimson";
}) {
	const activeBg = variant === "emerald" ? "bg-emerald-600" : "bg-accent";
	const hoverBg =
		variant === "emerald" ? "hover:bg-emerald-600" : "hover:bg-accent";
	return (
		<button
			type="button"
			onClick={onClick}
			className={`border-4 border-rule px-4 py-3 text-sm font-medium transition-colors ${
				selected
					? `${activeBg} text-white`
					: `bg-white text-rule ${hoverBg} hover:text-white`
			}`}
		>
			{label}
		</button>
	);
}
