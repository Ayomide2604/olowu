import { supabase } from "@/lib/supabase/client";

export async function getEvents() {
	const { data, error } = await supabase
		.from("events")
		.select(
			`
      *,
      profiles(
        id,
        first_name,
        last_name,
        avatar_url
      )
      `,
		)
		.order("event_date", {
			ascending: true,
		})
		.order("event_time", {
			ascending: true,
		});

	if (error) {
		throw error;
	}

	return data;
}

export async function createEvent(event: {
	title: string;
	location: string;
	event_date: string;
	event_time: string;
}) {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const { data, error } = await supabase

		.from("events")

		.insert({
			...event,

			created_by: user.id,
		})

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function updateEvent(
	id: string,
	updates: {
		title?: string;
		location?: string;
		event_date?: string;
		event_time?: string;
	},
) {
	const { data, error } = await supabase

		.from("events")

		.update(updates)

		.eq("id", id)

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function deleteEvent(id: string) {
	const { error } = await supabase

		.from("events")

		.delete()

		.eq("id", id);

	if (error) {
		throw error;
	}
}

export async function getEventsCount() {
	const { data, error, count } = await supabase
		.from("events")
		.select("*", { count: "exact", head: true });

	if (error) {
		throw error;
	}

	return count || 0;
}
