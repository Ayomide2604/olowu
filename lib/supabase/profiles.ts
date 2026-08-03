import { supabase } from "@/lib/supabase/client";

export async function getProfiles() {
	const { data, error } = await supabase

		.from("profiles")

		.select(
			`
        id,
        first_name,
        last_name
    `,
		)

		.order("first_name", {
			ascending: true,
		});

	if (error) {
		throw error;
	}

	return data;
}
