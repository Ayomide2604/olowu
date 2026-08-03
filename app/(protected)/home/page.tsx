"use client";

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

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  createdBy: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Family Dinner",
    date: "Saturday, August 10",
    time: "6:00 PM",
    location: "Olowu Home",
    createdBy: "Ayomide",
  },

  {
    id: 2,
    title: "Doctor Appointment",
    date: "Thursday, August 15",
    time: "10:30 AM",
    location: "Beaumont Medical Centre",
    createdBy: "Wife",
  },
];

const overview = [
  {
    title: "Tasks",
    value: 3,
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
    link: "/tasks",
  },

  {
    title: "Shopping",
    value: 5,
    icon: ShoppingCart,
    color: "bg-purple-100 text-purple-600",
    link: "/shopping",
  },

  {
    title: "Events",
    value: 2,
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
    link: "/events",
  },

  {
    title: "Birthdays",
    value: 1,
    icon: Cake,
    color: "bg-pink-100 text-pink-600",
    link: "/birthdays",
  },
];

const familyMembers = ["Ayomide", "Wife", "Asher"];

export default function Home() {
  return (
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
          Ayomide
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
              3 members
            </p>
          </div>

          <div
            className="
            flex
            -space-x-3
            "
          >
            {familyMembers.map((member) => (
              <Avatar key={member} name={member} />
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
          {overview.map((item) => {
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
                    {item.value}
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
          {events.map((event) => {
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

                        {event.date}
                      </p>

                      <p
                        className="
                          flex
                          items-center
                          gap-2
                          "
                      >
                        <Clock size={16} />

                        {event.time}
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
                      bg-purple-100
                      text-purple-700
                      flex
                      items-center
                      justify-center
                      font-semibold
                      "
                  >
                    {initials}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
