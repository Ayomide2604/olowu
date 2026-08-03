"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function WelcomePage() {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user, router]);

  return (
    <div
      className="
min-h-screen
flex
items-center
justify-center
px-6
"
    >
      <div
        className="
text-center
space-y-6
"
      >
        <div
          className="
text-6xl
"
        >
          👨‍👩‍👦
        </div>

        <h1
          className="
text-4xl
font-bold
"
        >
          Olowu Family
        </h1>

        <p
          className="
text-gray-500
"
        >
          Everything your family needs in one place.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="
px-8
py-3
rounded-2xl
bg-purple-600
text-white
font-medium
"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
