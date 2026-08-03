import { supabase } from "@/lib/supabase/client";

export async function getProfiles() {
	const { data, error } = await supabase
		.from("profiles")
		.select(
			`
        id,
        first_name,
        last_name,
        avatar_url
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

export async function getCurrentUserProfile(userId: string) {
	const { data, error } = await supabase
		.from("profiles")
		.select(
			`
        id,
        first_name,
        last_name,
        avatar_url
    `,
		)
		.eq("id", userId)
		.single();

	if (error) {
		throw error;
	}

	return data;
}
