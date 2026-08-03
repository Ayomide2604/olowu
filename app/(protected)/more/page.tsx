"use client";

import {
    useState
} from "react";

import {
    useRouter
} from "next/navigation";


import {
    supabase
} from "@/lib/supabase/client";


import MoreHeader from "@/components/more/MoreHeader";

import ProfileCard from "@/components/more/ProfileCard";

import MoreMenu from "@/components/more/MoreMenu";

import LogoutConfirmModal from "@/components/more/LogoutConfirmModal";



export default function MorePage() {


    const router = useRouter();


    const [
        showLogoutModal,
        setShowLogoutModal
    ] = useState(false);




    async function logout() {


        await supabase.auth.signOut();


        router.replace("/login");


    }





    return (

        <div
            className="
px-5
py-6
space-y-7
"
        >


            <MoreHeader />

            <MoreMenu
                onLogout={() => setShowLogoutModal(true)}
            />

            {showLogoutModal && (
                <LogoutConfirmModal
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={logout}
                />
            )}


        </div>

    );


}