"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  CalendarDays,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";

type Props = {
  task: string;
  date: string;
  time: string;
  assignedTo: string;
  completed: boolean;

  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
};

export default function TaskCard({
  task,
  date,
  time,
  assignedTo,
  completed,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <GlassCard
      className={`
        p-5
        relative
        ${showMenu ? "z-50" : ""}
      `}
    >
      <div
        className="
        flex
        items-start
        justify-between
        "
      >
        {/* LEFT SIDE */}

        <div
          className="
          flex
          gap-3
          "
        >
          {/* COMPLETE BUTTON */}

          <button
            onClick={onToggle}
            className={`
              w-11
              h-11
              rounded-2xl
              flex
              items-center
              justify-center
              transition

              ${
                completed
                  ? "bg-green-100 text-green-600"
                  : "bg-purple-100 text-purple-600 hover:bg-purple-200"
              }

            `}
          >
            <CheckCircle2 size={22} />
          </button>

          <div>
            <h3
              className={`
                font-semibold

                ${completed ? "line-through text-gray-400" : "text-gray-900"}

              `}
            >
              {task}
            </h3>

            <div
              className="
              mt-2
              space-y-1
              text-sm
              text-gray-500
              "
            >
              <p
                className="
                flex
                items-center
                gap-2
                "
              >
                <CalendarDays size={15} />

                {date}
              </p>

              <p
                className="
                flex
                items-center
                gap-2
                "
              >
                <Clock size={15} />

                {time}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          className="
          flex
          items-center
          gap-2
          relative
          "
        >
          <Avatar name={assignedTo} />

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
                  top-12
                  w-36
                  bg-white
                  rounded-2xl
                  shadow-xl
                  border
                  p-2
                  z-[100]
                "
            >
              {/* EDIT */}

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

              {/* DELETE */}

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
