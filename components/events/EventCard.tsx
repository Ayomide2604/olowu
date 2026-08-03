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
import { motion, AnimatePresence } from "framer-motion";

import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";

function humanizeDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
  if (diffDays <= 7) return `in ${diffDays} days`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

type Props = {
  title: string;

  date: string;

  time: string;

  location: string;

  createdBy: string;

  avatarUrl?: string | null;

  onEdit: () => void;

  onDelete: () => void;

  index?: number;
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
  index = 0,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const initials = (createdBy || "Ayomide")
    .split(" ")
    .map((item) => item[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        delay: index * 0.05,
      }}
    >
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

                  {humanizeDate(date)}
                </p>

                <p
                  className="
                flex
                items-center
                gap-2
                "
                >
                  <Clock size={15} />

                  {formatTime(time)}
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

            <motion.button
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
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <MoreVertical size={20} />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
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
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <motion.button
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
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Pencil size={15} />
                    Edit
                  </motion.button>

                  <motion.button
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
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Trash2 size={15} />
                    Delete
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
