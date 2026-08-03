import EventCard from "./EventCard";


export type Event = {
  id: number;

  title: string;

  date: string;

  time: string;

  location: string;

  createdBy: string;

  createdAt: number;
};



type Props = {
  events: Event[];

  onEdit: (event: Event) => void;

  onDelete: (id: number) => void;
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
        events.map((event) => (

          <EventCard

            key={event.id}

            title={event.title}

            date={event.date}

            time={event.time}

            location={event.location}

            createdBy={event.createdBy}

            onEdit={() =>
              onEdit(event)
            }

            onDelete={() =>
              onDelete(event.id)
            }

          />

        ))
      }


    </div>

  );
}