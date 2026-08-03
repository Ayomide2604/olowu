import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";


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
    <html lang="en">
      <body className="bg-gray-50">

        <Header />

        <main className="
          min-h-screen
          pb-20
        ">
          {children}
        </main>

        <BottomNav />

      </body>
    </html>
  );
}