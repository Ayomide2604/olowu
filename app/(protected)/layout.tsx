import ProtectedRoute from "@/components/auth/ProtectedRoute";

import BottomNav from "@/components/layout/BottomNav";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="bg-gray-50">

      <main
        className="
            min-h-screen
            pb-20
          "
      >
        <ProtectedRoute>{children}</ProtectedRoute>
      </main>

      <BottomNav />
    </div>
  )

}
