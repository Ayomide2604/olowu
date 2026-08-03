"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;

  onAdd: (name: string, quantity: string) => void;
};

export default function AddItemModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState("");

  const [quantity, setQuantity] = useState("");

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

        <div
          className="
mt-6
space-y-4
"
        >
          <input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
w-full
border
rounded-2xl
p-3
"
          />

          <input
            placeholder="Quantity"
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
            onClick={() => onAdd(name, quantity)}
            className="
w-full
bg-purple-600
text-white
py-3
rounded-2xl
"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
