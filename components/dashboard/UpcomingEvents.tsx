import EventCard from "./EventCard";
import { events } from "@/data/dashboard";

export default function UpcomingEvents() {
    return (
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
text-lg
"
                >
                    Upcoming Events
                </h2>

                <button
                    className="
text-sm
text-purple-600
font-medium
"
                >
                    View all
                </button>
            </div>

            <div
                className="
space-y-4
"
            >
                {events.map((event) => (
                    <EventCard key={event.id} {...event} />
                ))}
            </div>
        </section>
    );
}
