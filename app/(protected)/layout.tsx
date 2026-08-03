import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">
      <body className="bg-gray-50">
        <Header />

        <main
          className="
            min-h-screen
            pb-20
          "
        >
          <ProtectedRoute>{children}</ProtectedRoute>
        </main>

        <BottomNav />
      </body>
    </html>
  )

}
