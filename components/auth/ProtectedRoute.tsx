"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthProvider";


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {


  const {
    user,
    loading,
  } = useAuth();


  const router = useRouter();




  useEffect(() => {


    if (!loading && !user) {

      router.replace("/login");

    }


  }, [
    loading,
    user,
    router,
  ]);






  // Wait for Supabase session check

  if (loading) {

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        "
      >

        Loading...

      </div>

    );

  }





  // Not authenticated

  if (!user) {

    return null;

  }





  return children;

}