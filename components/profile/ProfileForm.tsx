type Props = {

    firstName: string;

    lastName: string;

    email: string;

    setFirstName: (value: string) => void;

    setLastName: (value: string) => void;

};


export default function ProfileForm({
    firstName,
    lastName,
    email,
    setFirstName,
    setLastName,
}: Props) {


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




            <button

                className="
w-full
py-3
rounded-2xl
bg-purple-600
text-white
font-medium
"

            >

                Save Changes

            </button>



        </div>

    );


}