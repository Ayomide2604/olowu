import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-gray-50">



        <AuthProvider>{children}</AuthProvider>


      </body>
    </html>
  );
}
