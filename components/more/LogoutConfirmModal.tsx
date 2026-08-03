"use client";

import { X, LogOut } from "lucide-react";


type Props = {
    onClose: () => void;
    onConfirm: () => void;
};


export default function LogoutConfirmModal({
    onClose,
    onConfirm,
}: Props) {


    return (

        <div
            className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      px-5
      z-50
      "
        >


            <div
                className="
        bg-white
        w-full
        max-w-md
        rounded-3xl
        p-6
        shadow-xl
        relative
        "
            >


                {/* Close */}

                <button
                    onClick={onClose}
                    className="
          absolute
          right-5
          top-5
          w-9
          h-9
          rounded-full
          flex
          items-center
          justify-center
          hover:bg-gray-100
          "
                >

                    <X size={20} />

                </button>





                <div
                    className="
          w-14
          h-14
          rounded-2xl
          bg-red-100
          text-red-600
          flex
          items-center
          justify-center
          "
                >

                    <LogOut size={26} />

                </div>





                <h2
                    className="
          text-xl
          font-bold
          mt-5
          "
                >

                    Logout?

                </h2>



                <p
                    className="
          text-gray-500
          mt-2
          "
                >

                    Are you sure you want to logout from your account?

                </p>





                <div
                    className="
          mt-6
          space-y-3
          "
                >



                    <button

                        onClick={onConfirm}

                        className="
            w-full
            py-3
            rounded-2xl
            bg-red-600
            text-white
            font-medium
            "

                    >

                        Logout

                    </button>





                    <button

                        onClick={onClose}

                        className="
            w-full
            py-3
            rounded-2xl
            bg-gray-100
            font-medium
            "

                    >

                        Cancel

                    </button>



                </div>


            </div>


        </div>

    );

}