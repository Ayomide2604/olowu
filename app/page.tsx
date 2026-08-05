"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cake, CheckCircle2, ShoppingCart, CalendarDays } from "lucide-react";

import { useAuth } from "@/context/AuthProvider";

const features = [
  { label: "Birthdays", icon: Cake, bg: "bg-pink-100", fg: "text-pink-600" },
  {
    label: "Tasks",
    icon: CheckCircle2,
    bg: "bg-[var(--primary-soft)]",
    fg: "text-[var(--primary)]",
  },
  {
    label: "Shopping",
    icon: ShoppingCart,
    bg: "bg-purple-100",
    fg: "text-purple-600",
  },
  { label: "Events", icon: CalendarDays, bg: "bg-blue-100", fg: "text-blue-600" },
];

export default function WelcomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user, router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[var(--primary-soft)] via-[var(--background)] to-[var(--primary-soft)]">
      {/* Decorative gradient circles */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[var(--primary-soft)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-pink-100 blur-3xl" />

      {/* Glass sheet, floating like the rest of the app's cards */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-5 pb-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="app-glass relative mx-auto max-w-sm rounded-[28px] px-6 pb-7 pt-8 text-center shadow-[var(--shadow-floating)]"
        >
          <h1 className="text-[28px] font-semibold leading-[1.15] text-[var(--text-primary)]">
            Everything family,
            <br />
            <span className="text-[var(--primary)]">all in one place.</span>
          </h1>

          <p className="mx-auto mt-3 max-w-[26ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Birthdays, tasks, shopping, and plans — kept together for
            everyone who matters.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {features.map(({ label, icon: Icon, bg, fg }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1.5 rounded-full ${bg} px-3 py-1.5 text-xs font-medium ${fg}`}
              >
                <Icon size={13} />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-7 space-y-3">
            <button
              onClick={() => router.push("/login")}
              className="ripple-effect w-full rounded-2xl bg-[var(--primary)] py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
            >
              Get Started
            </button>

            <button
              onClick={() => router.push("/login")}
              className="text-sm text-white/80 hover:text-white"
            >
              Already have an account? Log in
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}