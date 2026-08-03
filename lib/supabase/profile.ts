import { supabase } from "@/lib/supabase/client";

export async function getProfile(userId: string) {
	const { data, error } = await supabase

		.from("profiles")

		.select("*")

		.eq("id", userId)

		.single();

	if (error) {
		console.log(error);

		return null;
	}

	return data;
}

export async function updateProfile(
	userId: string,
	profile: {
		first_name: string;
		last_name: string;
		avatar_url?: string;
	},
) {
	const { data, error } = await supabase

		.from("profiles")

		.update(profile)

		.eq("id", userId)

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}
