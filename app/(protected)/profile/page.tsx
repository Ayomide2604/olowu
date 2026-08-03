"use client";

import {
    useEffect,
    useState,
} from "react";


import {
    useAuth
} from "@/context/AuthProvider";


import {
    getProfile,
    updateProfile
} from "@/lib/supabase/profile";


import {
    uploadAvatar
} from "@/lib/supabase/storage";

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
    ] = useState("");



    const [
        lastName,
        setLastName
    ] = useState("");



    const [
        avatarUrl,
        setAvatarUrl
    ] = useState<string | undefined>();


    const [
        loading,
        setLoading
    ] = useState(true);





    useEffect(() => {


        if (user) {

            loadProfile();

        }


    }, [user]);







    async function loadProfile() {


        if (!user) return;



        const profile =
            await getProfile(user.id);



        if (profile) {


            setFirstName(
                profile.first_name ?? ""
            );


            setLastName(
                profile.last_name ?? ""
            );


            setAvatarUrl(
                profile.avatar_url
            );


        }


        setLoading(false);


    }






    async function saveProfile() {


        if (!user) return;



        await updateProfile(

            user.id,

            {

                first_name: firstName,

                last_name: lastName,

                avatar_url: avatarUrl,

            }

        );


    }

    async function handleAvatarUpload(
        file: File
    ) {

        if (!user) return;


        const url =
            await uploadAvatar(
                user.id,
                file
            );


        setAvatarUrl(url);



        await updateProfile(

            user.id,

            {
                avatar_url: url,
                first_name: firstName,
                last_name: lastName
            }

        );


    }







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

                    <ProfileAvatar

                        image={avatarUrl}

                        onUpload={handleAvatarUpload}

                    />


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



                    onSave={saveProfile}


                />



            </GlassCard>




        </div>

    );

}