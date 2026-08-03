"use client";

import { useEffect, useState } from "react";

import EventHeader from "@/components/events/EventHeader";
import EventList, { Event } from "@/components/events/EventList";
import EventModal from "@/components/events/EventModal";
import EventFilters from "@/components/events/EventFilters";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import CardSkeleton from "@/components/ui/CardSkeleton";

import { useAuth } from "@/context/AuthProvider";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent as removeEvent,
} from "@/lib/supabase/events";

const filters = [
  "All events",
  "Today",
  "Upcoming",
  "Past events",
];

export default function EventsPage() {
  const { user } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingEvent, setEditingEvent] =
    useState<Event | null>(null);

  const [eventToDelete, setEventToDelete] =
    useState<string | null>(null);

  const [activeFilter, setActiveFilter] =
    useState("All events");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data = await getEvents();

    setEvents(
      data.map((event: any) => ({
        id: event.id,

        title: event.title,

        date: event.event_date,

        time: event.event_time,

        location: event.location,

        createdBy: event.profiles
          ? `${event.profiles.first_name} ${event.profiles.last_name}`
          : "Unknown",

        createdById: event.created_by,

        avatarUrl: event.profiles?.avatar_url,

        createdAt: event.created_at,
      })),
    );

    setLoading(false);
  }

  async function saveEvent(data: {
    title: string;
    date: string;
    time: string;
    location: string;
  }) {
    if (!user) return;

    if (editingEvent) {
      await updateEvent(editingEvent.id, {
        title: data.title,
        event_date: data.date,
        event_time: data.time,
        location: data.location,
      });
    } else {
      await createEvent({
        title: data.title,
        location: data.location,
        event_date: data.date,
        event_time: data.time
      });
    }

    await loadEvents();

    setEditingEvent(null);

    setShowModal(false);
  }

  async function deleteEvent(id: string) {
    setEventToDelete(id);
  }

  async function confirmDelete() {
    if (eventToDelete) {
      await removeEvent(eventToDelete);
      await loadEvents();
      setEventToDelete(null);
    }
  }

  const filteredEvents = events.filter((event) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [year, month, day] = event.date.split("-").map(Number);
    const eventDate = new Date(year, month - 1, day);

    switch (activeFilter) {
      case "All events":
        return true;

      case "Today":
        return (
          eventDate.getFullYear() === today.getFullYear() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getDate() === today.getDate()
        );

      case "Upcoming":
        return eventDate > today;

      case "Past events":
        return eventDate < today;

      default:
        return true;
    }
  });

  return (
    <>
      <div
        className="
        px-5
        py-6
        space-y-7
        "
      >
        <div
          className="
      px-5
      py-6
      space-y-7
      "
        >
          <EventHeader
            onAdd={() => setShowModal(true)}
          />

          <EventFilters
            filters={filters}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <EventList
              events={[...filteredEvents].sort((a, b) => {
                const first = new Date(`${a.date}T${a.time}`);

                const second = new Date(`${b.date}T${b.time}`);

                return first.getTime() - second.getTime();
              })}
              onEdit={(event) => {
                setEditingEvent(event);

                setShowModal(true);
              }}
              onDelete={deleteEvent}
            />
          )}

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

          {eventToDelete && (
            <ConfirmModal
              title="Delete Event"
              message="Are you sure you want to delete this event? This action cannot be undone."
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={confirmDelete}
              onCancel={() => setEventToDelete(null)}
            />
          )}
        </div>
      </div>

      <LoadingOverlay isLoading={loading} message="Loading events..." />
    </>
  );
}