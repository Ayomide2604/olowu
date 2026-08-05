import { supabase } from "./client";

export type Birthday = {
	id: string;
	first_name: string;
	last_name: string | null;
	date_of_birth: string;
	relationship: string;
	custom_relationship: string | null;
	created_by: string;
	created_at: string;
};

export async function getBirthdays(): Promise<Birthday[]> {
	const { data, error } = await supabase.from("birthdays").select("*");

	if (error) throw error;

	const birthdays = data || [];

	// Sort by next upcoming birthday
	const sortedBirthdays = birthdays.sort((a, b) => {
		const getNextBirthday = (dateOfBirth: string) => {
			const today = new Date();
			const birthDate = new Date(dateOfBirth);

			let nextBirthday = new Date(
				today.getFullYear(),
				birthDate.getMonth(),
				birthDate.getDate(),
			);

			// If birthday has already passed this year, use next year
			if (nextBirthday < today) {
				nextBirthday.setFullYear(today.getFullYear() + 1);
			}

			return nextBirthday;
		};

		const nextA = getNextBirthday(a.date_of_birth);
		const nextB = getNextBirthday(b.date_of_birth);

		return nextA.getTime() - nextB.getTime();
	});

	return sortedBirthdays;
}

export async function createBirthday(
	birthday: Omit<Birthday, "id" | "created_at" | "created_by">,
): Promise<Birthday> {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from("birthdays")
		.insert({
			...birthday,
			created_by: user?.id,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function updateBirthday(
	id: string,
	birthday: Partial<Omit<Birthday, "id" | "created_at" | "created_by">>,
): Promise<Birthday> {
	// Only update the fields that are allowed to be changed
	const updateData: any = {};
	if (birthday.first_name !== undefined)
		updateData.first_name = birthday.first_name;
	if (birthday.last_name !== undefined)
		updateData.last_name = birthday.last_name;
	if (birthday.date_of_birth !== undefined)
		updateData.date_of_birth = birthday.date_of_birth;
	if (birthday.relationship !== undefined)
		updateData.relationship = birthday.relationship;
	if (birthday.custom_relationship !== undefined)
		updateData.custom_relationship = birthday.custom_relationship;

	const { data, error } = await supabase
		.from("birthdays")
		.update(updateData)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function deleteBirthday(id: string): Promise<void> {
	const { error } = await supabase.from("birthdays").delete().eq("id", id);

	if (error) throw error;
}

export async function getBirthdaysCount(): Promise<number> {
	const { count, error } = await supabase
		.from("birthdays")
		.select("*", { count: "exact", head: true });

	if (error) throw error;
	return count || 0;
}
