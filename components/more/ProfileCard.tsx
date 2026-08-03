import {
    User
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";


export default function ProfileCard() {

    return (

        <GlassCard className="p-5">

            <button
                className="
w-full
flex
items-center
gap-4
"
            >

                <div
                    className="
w-11
h-11
rounded-2xl
bg-purple-100
text-purple-600
flex
items-center
justify-center
"
                >

                    <User size={22} />

                </div>


                <div
                    className="
text-left
"
                >

                    <h3
                        className="
font-semibold
"
                    >
                        Profile
                    </h3>


                    <p
                        className="
text-sm
text-gray-500
"
                    >
                        View and edit your profile
                    </p>


                </div>


            </button>


        </GlassCard>

    );

}