"use client";

import { useState } from "react";

import EventHeader from "@/components/events/EventHeader";

import EventList, { Event } from "@/components/events/EventList";

import EventModal from "@/components/events/EventModal";

const initialEvents: Event[] = [
  {
    id: 1,

    title: "Family Dinner",

    date: "2026-08-10",

    time: "18:00",

    location: "Olowu Home",

    createdBy: "Ayomide",

    createdAt: Date.now() - 3000,
  },

  {
    id: 2,

    title: "Doctor Appointment",

    date: "2026-08-15",

    time: "10:30",

    location: "Beaumont Medical Centre",

    createdBy: "Wife",

    createdAt: Date.now() - 2000,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const [showModal, setShowModal] = useState(false);

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  function saveEvent(data: Omit<Event, "id" | "createdAt">) {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((item) =>
          item.id === editingEvent.id
            ? {
                ...item,
                ...data,
              }
            : item,
        ),
      );

      setEditingEvent(null);
    } else {
      setEvents((prev) => [
        ...prev,

        {
          id: Date.now(),

          ...data,

          createdAt: Date.now(),
        },
      ]);
    }

    setShowModal(false);
  }

  function deleteEvent(id: number) {
    setEvents((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div
      className="
px-5
py-6
space-y-7
"
    >
      <EventHeader onAdd={() => setShowModal(true)} />

      <EventList
        events={[...events].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        )}
        onEdit={(event) => {
          setEditingEvent(event);

          setShowModal(true);
        }}
        onDelete={deleteEvent}
      />

      {showModal && (
        <EventModal
          event={editingEvent}
          onClose={() => {
            setShowModal(false);

            setEditingEvent(null);
          }}
          onSave={saveEvent}
        />
      )}
    </div>
  );
}
