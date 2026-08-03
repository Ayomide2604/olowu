import {
  UserRound
} from "lucide-react";


type Props = {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
};


export default function Avatar({
  firstName,
  lastName,
  avatarUrl,
}: Props) {


  return (

    <div
      className="
      w-12
      h-12
      rounded-full
      bg-gradient-to-br
      from-purple-500
      to-indigo-500
      flex
      items-center
      justify-center
      text-white
      font-semibold
      overflow-hidden
      "
    >

      {
        avatarUrl ? (

          <img
            src={avatarUrl}
            alt={`${firstName} ${lastName}`}
            className="
            w-full
            h-full
            object-cover
            "
          />

        ) : (

          <UserRound size={15} />

        )
      }


    </div>

  );

}