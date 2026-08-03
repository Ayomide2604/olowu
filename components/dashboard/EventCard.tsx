import { CalendarDays, Clock, MapPin } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";

type Props = {
  title: string;
  date: string;
  time: string;
  location: string;
  createdBy: string;
};

export default function EventCard({
  title,
  date,
  time,
  location,
  createdBy,
}: Props) {
  const initials = createdBy
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <GlassCard
      className="
p-5
"
    >
      <div
        className="
flex
justify-between
items-start
"
      >
        <div>
          <h3
            className="
font-semibold
text-lg
"
          >
            {title}
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

              {date}
            </p>

            <p
              className="
flex
items-center
gap-2
"
            >
              <Clock size={16} />

              {time}
            </p>

            <p
              className="
flex
items-center
gap-2
"
            >
              <MapPin size={16} />

              {location}
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
}
