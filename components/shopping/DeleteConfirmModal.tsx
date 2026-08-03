"use client";

import { X } from "lucide-react";

type Props = {
  listName: string;

  onClose: () => void;

  onDelete: () => void;
};

export default function DeleteConfirmModal({
  listName,
  onClose,
  onDelete,
}: Props) {
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
        shadow-xl
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
          <X size={20} />
        </button>


        <h2
          className="
          text-xl
          font-bold
          "
        >
          Delete Shopping List?
        </h2>


        <p
          className="
          mt-3
          text-gray-500
          "
        >
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-700">
            {listName}
          </span>
          ?
        </p>


        <div
          className="
          mt-6
          space-y-3
          "
        >

          <button
            onClick={onDelete}
            className="
            w-full
            bg-red-500
            text-white
            py-3
            rounded-2xl
            font-medium
            "
          >
            Delete
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