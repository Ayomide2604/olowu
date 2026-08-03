"use client";

import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";

type Props = {
  onClose: () => void;
  onCreate: (name: string) => void;
};

export default function CreateListModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState("");

  function handleCreate() {
    const trimmed = name.trim();

    if (!trimmed) return;

    onCreate(trimmed);
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
        relative
        w-full
        max-w-md
        rounded-3xl
        bg-white
        p-6
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
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          hover:bg-gray-100
          "
        >
          <X size={20} />
        </button>

        {/* Icon */}

        <div
          className="
          mb-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-purple-100
          text-purple-600
          "
        >
          <ShoppingCart size={28} />
        </div>

        {/* Heading */}

        <h2 className="text-xl font-bold">Create Shopping List</h2>

        <p className="mt-1 text-sm text-gray-500">
          Give your shopping list a name.
        </p>

        {/* Form */}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">List Name</label>

          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Weekly Groceries"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreate();
              }
            }}
            className="
            w-full
            rounded-2xl
            border
            px-4
            py-3
            outline-none
            transition
            focus:border-purple-500
            focus:ring-2
            focus:ring-purple-500/20
            "
          />
        </div>

        {/* Actions */}

        <div className="mt-8 space-y-3">
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="
            w-full
            rounded-2xl
            bg-purple-600
            py-3
            font-medium
            text-white
            transition
            hover:bg-purple-700
            disabled:cursor-not-allowed
            disabled:opacity-40
            "
          >
            Create List
          </button>

          <button
            onClick={onClose}
            className="
            w-full
            rounded-2xl
            bg-gray-100
            py-3
            font-medium
            text-gray-700
            transition
            hover:bg-gray-200
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
