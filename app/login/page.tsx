"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const router = useRouter();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin() {
    const success = login(username, password);

    if (success) {
      router.replace("/home");
    } else {
      setError("Invalid username or password");
    }
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
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="
w-full
py-3
rounded-2xl
bg-purple-600
text-white
"
        >
          Login
        </button>

        <p
          className="
text-sm
text-gray-400
text-center
"
        >
          Demo: admin / admin
        </p>
      </div>
    </div>
  );
}
