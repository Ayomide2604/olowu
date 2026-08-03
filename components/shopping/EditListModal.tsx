"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  name: string;
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function EditListModal({ name, onClose, onSave }: Props) {
  const [value, setValue] = useState(name);

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
w-full
max-w-md
rounded-3xl
p-6
relative
shadow-xl
"
      >
        {/* Close */}

        <button
          onClick={onClose}
          className="
absolute
right-5
top-5
w-9
h-9
rounded-full
flex
items-center
justify-center
hover:bg-gray-100
"
        >
          <X size={20} />
        </button>

        <h2
          className="
text-xl
font-bold
"
        >
          Edit List
        </h2>

        <p
          className="
text-sm
text-gray-500
mt-1
"
        >
          Change your shopping list name
        </p>

        <div
          className="
mt-6
space-y-4
"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="
w-full
px-4
py-3
rounded-2xl
border
outline-none
focus:ring-2
focus:ring-purple-500
"
            autoFocus
          />

          <button
            onClick={() => onSave(value)}
            disabled={!value.trim()}
            className="
w-full
py-3
rounded-2xl
bg-purple-600
text-white
font-medium
disabled:opacity-50
"
          >
            Save Changes
          </button>

          <button
            onClick={onClose}
            className="
w-full
py-3
rounded-2xl
bg-gray-100
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
