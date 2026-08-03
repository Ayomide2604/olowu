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
		<div
			className="
      min-h-screen
      flex
      items-center
      justify-center
      px-5
      "
		>
			<div
				className="
        w-full
        max-w-md
        space-y-6
        "
			>
				<h1
					className="
          text-3xl
          font-bold
          "
				>
					Welcome back
				</h1>

				<input
					placeholder="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="
          w-full
          px-4
          py-3
          rounded-2xl
          border
          "
				/>

				<input
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="
          w-full
          px-4
          py-3
          rounded-2xl
          border
          "
				/>

				{error && (
					<p
						className="
              text-red-500
              text-sm
              "
					>
						{error}
					</p>
				)}

				<button
					onClick={handleLogin}
					disabled={loading}
					className="
          w-full
          py-3
          rounded-2xl
          bg-purple-600
          text-white
          disabled:opacity-50
          "
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</div>
		</div>
	);
}