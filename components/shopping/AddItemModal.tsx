"use client";

import { useState } from "react";
import { X } from "lucide-react";


type Props = {
  onClose: () => void;
  onItemAdd: (data: {
    title: string;
    quantity: string;
  }) => void;
};




export default function AddItemModal({
  onClose,
  onItemAdd
}: Props) {


  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");






  function handleAdd() {
    if (!title.trim())
      return;

    onItemAdd({
      title: title.trim(),
      quantity,
    });
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

          Add Item

        </h2>





        <p
          className="
text-sm
text-gray-500
mt-1
"
        >

          Add an item to your shopping list

        </p>







        <div
          className="
mt-6
space-y-4
"
        >





          <input

            placeholder="Item name"

            value={title}

            onChange={(e) =>
              setTitle(e.target.value)
            }

            className="
w-full
border
rounded-2xl
p-3
"

          />







          <input

            placeholder="Quantity (optional)"

            value={quantity}

            onChange={(e) =>
              setQuantity(e.target.value)
            }

            className="
w-full
border
rounded-2xl
p-3
"

          />














          <button

            onClick={handleAdd}

            disabled={!title.trim()}

            className="
w-full
bg-purple-600
text-white
py-3
rounded-2xl
disabled:opacity-40
"

          >

            Add Item

          </button>






          <button

            onClick={onClose}

            className="
w-full
bg-gray-100
py-3
rounded-2xl
"

          >

            Cancel

          </button>





        </div>






      </div>



    </div>


  );

}