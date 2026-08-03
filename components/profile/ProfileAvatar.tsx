import {
    Camera
} from "lucide-react";


type Props = {
    image?: string;
};


export default function ProfileAvatar({
    image
}: Props) {

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




            <button

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
"

            >

                <Camera size={18} />

            </button>



        </div>

    );

}