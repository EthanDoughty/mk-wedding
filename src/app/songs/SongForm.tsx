"use client";

import { useState } from "react";

type Song = {
	title: string | null;
	artist: string | null;
	artwork_url: string | null;
	odesli_page_url: string | null;
};

type Status =
	| { kind: "idle" }
	| { kind: "submitting" }
	| { kind: "success"; song: Song }
	| { kind: "error"; message: string };

export function SongForm() {
	const [status, setStatus] = useState<Status>({ kind: "idle" });
	const [name, setName] = useState("");

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const url = String(form.get("url") ?? "").trim();
		const submitter_name = name.trim() || null;

		if (!url) {
			setStatus({ kind: "error", message: "Paste a link to a song." });
			return;
		}

		setStatus({ kind: "submitting" });
		try {
			const res = await fetch("/api/songs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url, submitter_name }),
			});
			const body = (await res.json().catch(() => ({}))) as {
				error?: string;
				song?: Song;
			};
			if (!res.ok || !body.song) {
				setStatus({
					kind: "error",
					message: body.error ?? "Something went wrong. Please try again.",
				});
				return;
			}
			setStatus({ kind: "success", song: body.song });
			(e.target as HTMLFormElement).reset();
		} catch {
			setStatus({
				kind: "error",
				message: "Network error. Please try again.",
			});
		}
	}

	if (status.kind === "success") {
		return (
			<div className="text-center">
				<p className="font-serif italic text-accent uppercase tracking-[0.3em] text-xs">
					Added to the list
				</p>
				{status.song.artwork_url && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={status.song.artwork_url}
						alt=""
						className="mx-auto mt-6 w-40 h-40 border-4 border-rule object-cover"
					/>
				)}
				<p className="font-serif text-3xl mt-4 text-foreground">
					{status.song.title ?? "(untitled)"}
				</p>
				{status.song.artist && (
					<p className="text-muted text-xs mt-2 uppercase tracking-[0.2em]">
						{status.song.artist}
					</p>
				)}
				<button
					type="button"
					onClick={() => setStatus({ kind: "idle" })}
					className="mt-8 border-4 border-rule bg-accent px-8 py-3 text-white text-xs tracking-[0.25em] uppercase font-medium hover:bg-accent-dark transition-colors"
				>
					Add another
				</button>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<Field
				label="Song link"
				name="url"
				type="url"
				required
				placeholder="https://open.spotify.com/track/..."
			/>
			<div>
				<label
					htmlFor="submitter_name"
					className="block text-xs font-medium text-foreground uppercase tracking-[0.2em] mb-2"
				>
					Your name <span className="text-muted normal-case tracking-normal lowercase">(optional)</span>
				</label>
				<input
					id="submitter_name"
					name="submitter_name"
					type="text"
					maxLength={200}
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full border-2 border-rule bg-background text-foreground placeholder:text-muted px-3 py-2 text-sm focus:border-accent focus:outline-none"
				/>
			</div>

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
				{status.kind === "submitting" ? "Looking up…" : "Add to playlist"}
			</button>
		</form>
	);
}

function Field({
	label,
	name,
	type = "text",
	required,
	placeholder,
	maxLength,
}: {
	label: string;
	name: string;
	type?: string;
	required?: boolean;
	placeholder?: string;
	maxLength?: number;
}) {
	return (
		<div>
			<label
				htmlFor={name}
				className="block text-xs font-medium text-foreground uppercase tracking-[0.2em] mb-2"
			>
				{label}
				{required && <span className="text-accent ml-1">*</span>}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				required={required}
				placeholder={placeholder}
				maxLength={maxLength}
				className="w-full border-2 border-rule bg-background text-foreground placeholder:text-muted px-3 py-2 text-sm focus:border-accent focus:outline-none"
			/>
		</div>
	);
}
