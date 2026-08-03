"use client";

import { useState } from "react";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { Event } from "./EventList";

type Props = {
  event?: Event | null;

  onClose: () => void;

  onSave: (data: Omit<Event, "id" | "createdAt" | "createdBy" | "createdById" | "avatarUrl">) => void;
};

export default function EventModal({
  event,

  onClose,

  onSave,
}: Props) {
  const [title, setTitle] = useState(event?.title || "");

  const [date, setDate] = useState(event?.date || "");

  const [time, setTime] = useState(event?.time || "");

  const [location, setLocation] = useState(event?.location || "");


  function handleSave() {
    if (!title || !date || !time) return;

    onSave({
      title,

      date,

      time,

      location,
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        px-5
        z-50
        backdrop-blur-sm
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          p-6
          shadow-xl
          relative
          "
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <motion.button
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
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <X size={20} />
          </motion.button>

          <h2
            className="
            text-xl
            font-bold
            "
          >
            {event ? "Edit Event" : "Create Event"}
          </h2>

          <p
            className="
            text-sm
            text-gray-500
            mt-1
            "
          >
            Add family events
          </p>

          <div
            className="
            mt-6
            space-y-4
            "
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="
                w-full
                px-4
                py-3
                rounded-2xl
                border
                 app-input
                appearance-none
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
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
                app-input
                appearance-none
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="
                w-full
                px-4
                py-3
                rounded-2xl
                border
                app-input
                appearance-none
                "
              />
            </div>




            <motion.button
              onClick={handleSave}
              disabled={!title || !date || !time}
              className="
              w-full
              py-3
              rounded-2xl
              bg-purple-600
              text-white
              font-medium
              disabled:opacity-40
              "
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              {event ? "Save Changes" : "Create Event"}
            </motion.button>

            <motion.button
              onClick={onClose}
              className="
              w-full
              py-3
              rounded-2xl
              bg-gray-100
              "
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
