"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import BottomNav from "@/components/layout/BottomNav";
import PullToRefresh from "@/components/ui/PullToRefresh";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleRefresh = async () => {
    // Trigger a page refresh
    window.location.reload();
  };

  return (

    <div className="bg-gray-50">
      <PullToRefresh onRefresh={handleRefresh}>
        <main
          className="
            min-h-screen
            pb-20
          "
        >
          <ProtectedRoute>{children}</ProtectedRoute>
        </main>
      </PullToRefresh>

      <BottomNav />
    </div>
  )

}
