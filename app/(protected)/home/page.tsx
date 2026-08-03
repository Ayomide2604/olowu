"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  CheckCircle2,
  ShoppingCart,
  CalendarDays,
  Cake,
  Clock,
  MapPin,
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CardSkeleton from "@/components/ui/CardSkeleton";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Skeleton from "@/components/ui/Skeleton";

import { useAuth } from "@/context/AuthProvider";
import { getProfiles, getCurrentUserProfile } from "@/lib/supabase/profiles";
import { getEvents, getEventsCount } from "@/lib/supabase/events";
import { getTasksCount } from "@/lib/supabase/tasks";
import { getUncompletedShoppingItemsCount } from "@/lib/supabase/shopping";



const familyMembers = ["Ayomide", "Wife", "Asher"];

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
};

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  createdBy: string;
  avatarUrl?: string | null;
};

const overviewItems = [
  {
    title: "Tasks",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
    link: "/tasks",
    key: "tasks" as const,
  },

  {
    title: "Shopping",
    icon: ShoppingCart,
    color: "bg-purple-100 text-purple-600",
    link: "/shopping",
    key: "shopping" as const,
  },

  {
    title: "Events",
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
    link: "/events",
    key: "events" as const,
  },

  {
    title: "Birthdays",
    icon: Cake,
    color: "bg-pink-100 text-pink-600",
    link: "/birthdays",
    key: "birthdays" as const,
  },
];

export default function Home() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [overviewCounts, setOverviewCounts] = useState({
    tasks: 0,
    shopping: 0,
    events: 0,
    birthdays: 0,
  });
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadProfiles();
    loadEvents();
    loadOverviewCounts();
  }, [user]);

  async function loadProfiles() {
    try {
      const data = await getProfiles();
      setProfiles(data || []);

      if (user) {
        const userProfile = await getCurrentUserProfile(user.id);
        setCurrentUserProfile(userProfile);
      }
    } catch (error) {
      console.error("Failed to load profiles:", error);
    }
  }

  async function loadEvents() {
    try {
      const data = await getEvents();
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const upcomingEvents = data
        .map((event: any) => ({
          id: event.id,
          title: event.title,
          date: event.event_date,
          time: event.event_time,
          location: event.location,
          createdBy: event.profiles
            ? `${event.profiles.first_name} ${event.profiles.last_name}`
            : "Unknown",
          avatarUrl: event.profiles?.avatar_url,
        }))
        .filter((event: Event) => {
          const [year, month, day] = event.date.split("-").map(Number);
          const eventDate = new Date(year, month - 1, day);
          return eventDate >= today;
        })
        .sort((a: Event, b: Event) => {
          const first = new Date(`${a.date}T${a.time}`);
          const second = new Date(`${b.date}T${b.time}`);
          return first.getTime() - second.getTime();
        })
        .slice(0, 3);

      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Failed to load events:", error);
    }
  }

  async function loadOverviewCounts() {
    try {
      const [tasksCount, eventsCount, shoppingCount] = await Promise.all([
        getTasksCount(),
        getEventsCount(),
        getUncompletedShoppingItemsCount(),
      ]);

      setOverviewCounts({
        tasks: tasksCount,
        shopping: shoppingCount,
        events: eventsCount,
        birthdays: 0, // TODO: Implement birthdays count
      });
    } catch (error) {
      console.error("Failed to load overview counts:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="
        px-5
        py-6
        space-y-8
        relative
        "
      >
        <div
          className="
      px-5
      py-6
      space-y-8
      "
        >
          {/* Welcome */}

          <section>
            <p
              className="
          text-sm
          text-gray-500
          "
            >
              Good morning 👋
            </p>

            <h1
              className="
          text-3xl
          font-bold
          tracking-tight
          "
            >
              {currentUserProfile?.first_name || user?.user_metadata?.first_name || "User"}
            </h1>

            <p
              className="
          text-gray-500
          mt-2
          "
            >
              Here is your family overview.
            </p>
          </section>

          {/* Family */}

          <GlassCard className="p-5">
            <div
              className="
          flex
          justify-between
          items-center
          "
            >
              <div>
                <h2
                  className="
              font-semibold
              "
                >
                  Olowu Family
                </h2>

                <p
                  className="
              text-sm
              text-gray-500
              "
                >
                  {profiles.length} members
                </p>
              </div>

              <div
                className="
            flex
            -space-x-3
            "
              >
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
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
                    {profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={`${profile.first_name} ${profile.last_name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{profile.first_name?.charAt(0) || "U"}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Overview */}

          <section>
            <h2
              className="
          font-semibold
          mb-4
          "
            >
              Overview
            </h2>

            <div
              className="
          grid
          grid-cols-2
          gap-4
          "
            >
              {overviewItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.link}
                    className="
                  block
                  "
                  >
                    <GlassCard
                      className="
                    p-4
                    hover:scale-[1.02]
                    transition
                    "
                    >
                      <div
                        className={`
                      w-11
                      h-11
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      ${item.color}
                      `}
                      >
                        <Icon size={22} />
                      </div>

                      <p
                        className="
                      text-3xl
                      font-bold
                      mt-4
                      "
                      >
                        {overviewCounts[item.key]}
                      </p>

                      <p
                        className="
                      text-sm
                      text-gray-500
                      "
                      >
                        {item.title}
                      </p>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Upcoming Events */}

          <section>
            <div
              className="
          flex
          justify-between
          items-center
          mb-4
          "
            >
              <h2
                className="
            font-semibold
            "
              >
                Upcoming Events
              </h2>

              <Link
                href="/events"
                className="
            text-sm
            text-purple-600
            "
              >
                View all
              </Link>
            </div>

            <div
              className="
          space-y-4
          "
            >
              {events.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming events</p>
              ) : (
                events.map((event) => {
                  const initials = event.createdBy
                    .split(" ")
                    .map((name) => name[0])
                    .join("");

                  return (
                    <GlassCard key={event.id} className="p-5">
                      <div
                        className="
                      flex
                      justify-between
                      "
                      >
                        <div>
                          <h3
                            className="
                          font-semibold
                          text-lg
                          "
                          >
                            {event.title}
                          </h3>

                          <div
                            className="
                          mt-3
                          space-y-2
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
                              <CalendarDays size={16} />

                              {humanizeDate(event.date)}
                            </p>

                            <p
                              className="
                            flex
                            items-center
                            gap-2
                            "
                            >
                              <Clock size={16} />

                              {formatTime(event.time)}
                            </p>

                            <p
                              className="
                            flex
                            items-center
                            gap-2
                            "
                            >
                              <MapPin size={16} />

                              {event.location}
                            </p>
                          </div>
                        </div>

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
                          {event.avatarUrl ? (
                            <img
                              src={event.avatarUrl}
                              alt={event.createdBy}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{initials}</span>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>

      <LoadingOverlay isLoading={loading} message="Loading your family overview..." />
    </>
  );
}
