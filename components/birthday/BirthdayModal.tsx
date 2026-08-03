"use client";

import { useState } from "react";
import { X } from "lucide-react";

import type { Birthday } from "./BirthdayList";

type Props = {
  birthday?: Birthday | null;

  onClose: () => void;

  onSave: (data: Omit<Birthday, "id" | "createdAt">) => void;
};

export default function BirthdayModal({ birthday, onClose, onSave }: Props) {
  const [name, setName] = useState(birthday?.name || "");

  const [date, setDate] = useState(birthday?.date || "");

  const [relationship, setRelationship] = useState(
    birthday?.relationship || "",
  );

  const [notes, setNotes] = useState(birthday?.notes || "");

  function handleSave() {
    if (!name || !date) return;

    onSave({
      name,

      date,

      relationship,

      notes,
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
        w-full
        max-w-md
        rounded-3xl
        p-6
        shadow-xl
        relative
        "
      >
        {/* CLOSE */}

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
          {birthday ? "Edit Birthday" : "Add Birthday"}
        </h2>

        <p
          className="
          text-sm
          text-gray-500
          mt-1
          "
        >
          Save important family birthdays
        </p>

        <div
          className="
          mt-6
          space-y-4
          "
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="
            w-full
            px-4
            py-3
            rounded-2xl
            border
            outline-none
            focus:ring-2
            focus:ring-purple-500
            app-input
            appearance-none
            "
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
            w-full
            px-4
            py-3
            rounded-2xl
            border
            outline-none
            focus:ring-2
            focus:ring-purple-500
            app-input
            appearance-none
            "
          />

          <input
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            placeholder="Relationship (Son, Wife, Dad)"
            className="
            w-full
            px-4
            py-3
            rounded-2xl
            border
            outline-none
            focus:ring-2
            focus:ring-purple-
            appearance-none
            
            "
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            rows={3}
            className="
            w-full
            px-4
            py-3
            rounded-2xl
            border
            outline-none
            resize-none
            focus:ring-2
            focus:ring-purple-500
           
            
            "
          />

          <button
            onClick={handleSave}
            disabled={!name || !date}
            className="
            w-full
            py-3
            rounded-2xl
            bg-purple-600
            text-white
            font-medium
            disabled:opacity-40
            "
          >
            {birthday ? "Save Changes" : "Add Birthday"}
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
