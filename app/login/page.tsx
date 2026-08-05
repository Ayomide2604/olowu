"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleLogin() {
		setError("");
		setLoading(true);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError("Invalid email or password");
			setLoading(false);
			return;
		}

		router.replace("/home");
	}

	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
			{/* Soft decorative wash so the background isn't flat */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--primary-soft)] via-[var(--background)] to-[var(--background)]" />
			<div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[var(--primary-soft)] blur-3xl" />
			<div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-pink-100 blur-3xl" />

			<div className="app-glass relative z-10 w-full max-w-md space-y-6 rounded-[28px] px-7 py-9 shadow-[var(--shadow-floating)]">
				<div className="space-y-1 text-center">
					<h1 className="text-2xl font-semibold text-[var(--text-primary)]">
						Welcome back
					</h1>
					<p className="text-sm text-[var(--text-secondary)]">
						Log in to keep up with the family.
					</p>
				</div>

				<div className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="text-xs font-medium text-[var(--text-secondary)]"
						>
							Email
						</label>
						<input
							id="email"
							placeholder="you@example.com"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="app-input"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="text-xs font-medium text-[var(--text-secondary)]"
						>
							Password
						</label>
						<input
							id="password"
							placeholder="Enter your password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="app-input"
						/>
					</div>

					{error && (
						<p className="rounded-2xl bg-[var(--danger-soft)] px-4 py-2.5 text-sm text-[var(--danger)]">
							{error}
						</p>
					)}

					<button
						onClick={handleLogin}
						disabled={loading}
						className={`ripple-effect w-full rounded-2xl bg-[var(--primary)] py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-50 ${loading ? "btn-loading text-transparent" : ""
							}`}
					>
						{loading ? "Logging in" : "Log in"}
					</button>
				</div>
			</div>
		</div>
	);
}