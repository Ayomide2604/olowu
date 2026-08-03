import { Plus } from "lucide-react";


type Props = {
  onAdd:()=>void;
};


export default function EventHeader({
  onAdd,
}:Props){


  return (

    <div
      className="
      flex
      items-center
      justify-between
      "
    >

      <div>

        <h1
          className="
          text-2xl
          font-bold
          "
        >
          Events
        </h1>


        <p
          className="
          text-sm
          text-gray-500
          mt-1
          "
        >
          Manage your family events
        </p>

      </div>



      <button

        onClick={onAdd}

        className="
        w-11
        h-11
        rounded-2xl
        bg-purple-600
        text-white
        flex
        items-center
        justify-center
        shadow-lg
        "

      >

        <Plus size={22}/>

      </button>


    </div>

  );

}