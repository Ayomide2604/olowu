"use client";

import { X } from "lucide-react";

type Props = {
  itemTitle: string;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteItemModal({ itemTitle, onClose, onDelete }: Props) {
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
          Delete Item
        </h2>

        <p
          className="
mt-4
text-gray-600
"
        >
          Are you sure you want to delete "{itemTitle}"? This action cannot be undone.
        </p>

        <div
          className="
mt-6
flex
gap-3
"
        >
          <button
            onClick={onClose}
            className="
flex-1
border
border-gray-300
py-3
rounded-2xl
"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="
flex-1
bg-red-600
text-white
py-3
rounded-2xl
"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
