"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  item: { id: string; title: string; quantity: string; completed: boolean; createdAt: string };
  onClose: () => void;
  onSaveAction: (item: any) => void;
};

export default function EditItemModal({ item, onClose, onSaveAction }: Props) {
  const [title, setTitle] = useState(item.title);
  const [quantity, setQuantity] = useState(item.quantity);

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
          Edit Item
        </h2>

        <div
          className="
mt-6
space-y-4
"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
w-full
border
rounded-2xl
p-3
"
          />

          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="
w-full
border
rounded-2xl
p-3
"
          />

          <button
            onClick={() =>
              onSaveAction({
                ...item,
                title,
                quantity,
              })
            }
            className="
w-full
bg-purple-600
text-white
py-3
rounded-2xl
"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
