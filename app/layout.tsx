import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

import { AuthProvider } from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "Olowu Family",
  description: "Family management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>{children}</AuthProvider>
  );
}
