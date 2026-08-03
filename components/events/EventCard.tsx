"use client";

import { useState } from "react";

import {
  CalendarDays,
  Clock,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";

type Props = {
  title: string;

  date: string;

  time: string;

  location: string;

  createdBy: string;

  avatarUrl?: string | null;

  onEdit: () => void;

  onDelete: () => void;
};

export default function EventCard({
  title,
  date,
  time,
  location,
  createdBy,
  avatarUrl,

  onEdit,
  onDelete,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const initials = (createdBy || "Ayomide")
    .split(" ")
    .map((item) => item[0])
    .join("");

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
        justify-between
        "
      >
        <div
          className="
          flex
          gap-3
          "
        >
          <div
            className="
            w-11
            h-11
            rounded-2xl
            bg-blue-100
            text-blue-600
            flex
            items-center
            justify-center
            "
          >
            <CalendarDays size={22} />
          </div>

          <div>
            <h3
              className="
              font-semibold
              "
            >
              {title}
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

              <p
                className="
                flex
                items-center
                gap-2
                "
              >
                <MapPin size={15} />

                {location}
              </p>
            </div>
          </div>
        </div>

        <div
          className="
          flex
          items-start
          gap-2
          relative
          "
        >
          <div
            className="
            w-10
            h-10
            rounded-full
            bg-gradient-to-br
            from-purple-600
            to-purple-700
            flex
            items-center
            justify-center
            text-white
            font-semibold
            overflow-hidden
            border-2
            border-white
            "
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={createdBy}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

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
                  gap-2
                  items-center
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
                  gap-2
                  items-center
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
