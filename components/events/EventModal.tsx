"use client";

import { useState } from "react";

import { X } from "lucide-react";

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




          <button
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
          >
            {event ? "Save Changes" : "Create Event"}
          </button>

          <button
            onClick={onClose}
            className="
            w-full
            py-3
            rounded-2xl
            bg-gray-100
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
