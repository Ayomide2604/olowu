"use client";

import { useState } from "react";
import { X } from "lucide-react";


type Props = {

  onClose: () => void;

  onCreate: (name: string) => void;

};



export default function CreateListModal({
  onClose,
  onCreate
}: Props) {


  const [
    name,
    setName
  ] = useState("");





  function handleCreate() {

    if (!name.trim())
      return;


    onCreate(
      name.trim()
    );

  }







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
        rounded-3xl
        p-6
        w-full
        max-w-md
        relative
        "
      >



        <button

          onClick={onClose}

          className="
          absolute
          right-5
          top-5
          "

        >

          <X />

        </button>






        <h2
          className="
          text-xl
          font-bold
          "
        >

          Create Shopping List

        </h2>



        <p
          className="
          mt-1
          text-sm
          text-gray-500
          "
        >

          Organize your family shopping

        </p>







        <div
          className="
          mt-6
          space-y-4
          "
        >



          <div>

            <label
              className="
              text-sm
              font-medium
              "
            >

              List Name

            </label>



            <input

              placeholder="Example: Weekly Groceries"

              value={name}

              onChange={(e) =>
                setName(e.target.value)
              }

              autoFocus

              className="
              mt-2
              w-full
              border
              rounded-2xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-purple-500
              "

            />

          </div>








          <button

            onClick={handleCreate}

            disabled={!name.trim()}

            className="
            w-full
            bg-purple-600
            text-white
            py-3
            rounded-2xl
            font-medium
            disabled:opacity-40
            "

          >

            Create List

          </button>






          <button

            onClick={onClose}

            className="
            w-full
            bg-gray-100
            py-3
            rounded-2xl
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