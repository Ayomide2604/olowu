"use client";

import {
    Camera
} from "lucide-react";


type Props = {
    image?: string;
    onUpload: (file: File) => void;
};


export default function ProfileAvatar({
    image,
    onUpload
}: Props) {


    function handleFileChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = e.target.files?.[0];


        if (file) {

            onUpload(file);

        }

    }




    return (

        <div
            className="
relative
w-28
h-28
"
        >


            <div
                className="
w-28
h-28
rounded-full
bg-purple-100
flex
items-center
justify-center
text-4xl
overflow-hidden
"
            >

                {
                    image

                        ?

                        <img
                            src={image}
                            alt="Profile"
                            className="
w-full
h-full
object-cover
"
                        />

                        :

                        "👤"

                }

            </div>





            <input

                id="avatar-upload"

                type="file"

                accept="image/*"

                className="hidden"

                onChange={handleFileChange}

            />





            <label

                htmlFor="avatar-upload"

                className="
absolute
bottom-0
right-0
w-10
h-10
rounded-full
bg-purple-600
text-white
flex
items-center
justify-center
shadow
cursor-pointer
"

            >

                <Camera size={18} />

            </label>



        </div>

    );

}