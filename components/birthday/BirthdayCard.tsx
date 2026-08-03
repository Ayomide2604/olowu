"use client";

import { useState } from "react";

import { CalendarDays, MoreVertical, Pencil, Trash2, Cake } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";

type Props = {
  name: string;

  date: string;

  turning: number;

  onEdit: () => void;

  onDelete: () => void;
};

export default function BirthdayCard({
  name,
  date,
  turning,
  onEdit,
  onDelete,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <GlassCard
      className={`
      p-4
      relative
      ${showMenu ? "z-50" : ""}
      `}
    >
      <div
        className="
        flex
        items-center
        justify-between
        "
      >
        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            w-11
            h-11
            rounded-2xl
            bg-pink-100
            text-pink-600
            flex
            items-center
            justify-center
            "
          >
            <Cake size={22} />
          </div>

          <div>
            <h3
              className="
              font-semibold
              "
            >
              {name}
            </h3>

            <div
              className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              mt-1
              "
            >
              <CalendarDays size={15} />

              {date}
            </div>

            <p
              className="
              text-sm
              text-purple-600
              font-medium
              mt-1
              "
            >
              Turning {turning}
            </p>
          </div>
        </div>

        <div
          className="
          relative
          "
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            hover:bg-gray-100
            "
          >
            <MoreVertical size={20} />
          </button>

          {showMenu && (
            <div
              className="
                absolute
                right-0
                top-10
                w-32
                bg-white
                rounded-2xl
                shadow-xl
                border
                p-2
                z-[100]
                "
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit();
                }}
                className="
                  flex
                  items-center
                  gap-2
                  w-full
                  px-3
                  py-2
                  rounded-xl
                  hover:bg-gray-100
                  text-sm
                  "
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete();
                }}
                className="
                  flex
                  items-center
                  gap-2
                  w-full
                  px-3
                  py-2
                  rounded-xl
                  hover:bg-red-50
                  text-red-500
                  text-sm
                  "
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
