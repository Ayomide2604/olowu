"use client";


import {
    useState
} from "react";


import {
    useAuth
} from "@/context/AuthProvider";


import ProfileHeader from "@/components/profile/ProfileHeader";

import ProfileAvatar from "@/components/profile/ProfileAvatar";

import ProfileForm from "@/components/profile/ProfileForm";

import GlassCard from "@/components/ui/GlassCard";



export default function ProfilePage() {


    const {
        user
    } = useAuth();



    const [
        firstName,
        setFirstName
    ] = useState("Ayomide");


    const [
        lastName,
        setLastName
    ] = useState("Olowu");





    return (

        <div

            className="
px-5
py-6
space-y-7
"

        >


            <ProfileHeader />




            <GlassCard className="p-6">

                <div
                    className="
flex
justify-center
"
                >

                    <ProfileAvatar />


                </div>


            </GlassCard>






            <GlassCard className="p-6">


                <ProfileForm

                    firstName={firstName}

                    lastName={lastName}

                    email={
                        user?.email ?? ""
                    }

                    setFirstName={setFirstName}

                    setLastName={setLastName}

                />


            </GlassCard>



        </div>

    );

}