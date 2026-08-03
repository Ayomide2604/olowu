import EventCard from "./EventCard";


export type Event = {
  id: string;

  title: string;

  date: string;

  time: string;

  location: string;

  createdBy: string;

  createdById: string;

  avatarUrl?: string | null;

  createdAt: string;
};



type Props = {
  events: Event[];

  onEdit: (event: Event) => void;

  onDelete: (id: string) => void;
};



export default function EventList({
  events,
  onEdit,
  onDelete,
}: Props) {


  return (

    <div
      className="
      space-y-4
      "
    >

      {
        events.map((event, index) => (

          <EventCard

            key={event.id}

            title={event.title}

            date={event.date}

            time={event.time}

            location={event.location}

            createdBy={event.createdBy}

            avatarUrl={event.avatarUrl}

            onEdit={() =>
              onEdit(event)
            }

            onDelete={() =>
              onDelete(event.id)
            }

            index={index}

          />

        ))
      }


    </div>

  );
}