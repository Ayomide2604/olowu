"use client";

import {
    useState
} from "react";

import {
    Loader2,
    CheckCircle2
} from "lucide-react";


type Props = {

    firstName: string;

    lastName: string;

    email: string;

    setFirstName: (value: string) => void;

    setLastName: (value: string) => void;

    onSave: () => Promise<void>;

};


export default function ProfileForm({
    firstName,
    lastName,
    email,
    setFirstName,
    setLastName,
    onSave,
}: Props) {


    const [
        saving,
        setSaving
    ] = useState(false);



    const [
        success,
        setSuccess
    ] = useState(false);





    async function handleSave() {


        setSaving(true);

        setSuccess(false);



        try {


            await onSave();



            setSuccess(true);



            setTimeout(() => {

                setSuccess(false);

            }, 3000);



        }

        finally {


            setSaving(false);


        }


    }






    return (

        <div
            className="
space-y-5
"
        >


            <div>

                <label
                    className="
text-sm
font-medium
"
                >
                    First Name
                </label>


                <input

                    value={firstName}

                    onChange={(e) =>
                        setFirstName(e.target.value)
                    }

                    className="
mt-2
w-full
px-4
py-3
rounded-2xl
border
"

                />

            </div>





            <div>

                <label
                    className="
text-sm
font-medium
"
                >
                    Last Name
                </label>


                <input

                    value={lastName}

                    onChange={(e) =>
                        setLastName(e.target.value)
                    }

                    className="
mt-2
w-full
px-4
py-3
rounded-2xl
border
"

                />


            </div>







            <div>

                <label
                    className="
text-sm
font-medium
"
                >
                    Email Address
                </label>


                <input

                    value={email}

                    disabled

                    className="
mt-2
w-full
px-4
py-3
rounded-2xl
border
bg-gray-100
"

                />


            </div>







            {
                success && (

                    <div
                        className="
flex
items-center
gap-2
rounded-2xl
bg-green-50
text-green-600
px-4
py-3
text-sm
"
                    >

                        <CheckCircle2 size={18} />

                        Profile updated successfully

                    </div>

                )
            }







            <button

                onClick={handleSave}

                disabled={saving}

                className="
w-full
py-3
rounded-2xl
bg-purple-600
text-white
font-medium
flex
items-center
justify-center
gap-2
disabled:opacity-50
"

            >

                {
                    saving
                        ?

                        (
                            <>
                                <Loader2
                                    size={18}
                                    className="
                            animate-spin
                            "
                                />

                                Saving...

                            </>
                        )

                        :

                        "Save Changes"

                }


            </button>



        </div>

    );

}