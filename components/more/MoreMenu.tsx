import {
    LogOut,
    User,
} from "lucide-react";

import Link from "next/link";


type Props = {
    onLogout: () => void;
};


export default function MoreMenu({
    onLogout,
}: Props) {


    return (

        <div
            className="
      space-y-4
      "
        >


            {/* Profile */}

            <Link

                href="/profile"

                className="
        w-full
        p-5
        rounded-3xl
        bg-purple-50
        text-purple-600
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
            "
                    >
                        View and edit your profile
                    </p>


                </div>



            </Link>





            {/* Logout */}

            <button

                onClick={onLogout}

                className="
        w-full
        p-5
        rounded-3xl
        bg-red-50
        text-red-600
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
          bg-red-100
          flex
          items-center
          justify-center
          "
                >

                    <LogOut size={22} />

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
                        Logout
                    </h3>


                    <p
                        className="
            text-sm
            "
                    >
                        Sign out of your account
                    </p>


                </div>


            </button>



        </div>

    );

}