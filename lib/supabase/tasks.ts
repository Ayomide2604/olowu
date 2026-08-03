import { supabase } from "@/lib/supabase/client";

export async function getTasks() {
	const { data, error } = await supabase

		.from("tasks")

		.select(
			`
      *,
      task_assignments(
        profiles(
          id,
          first_name,
          last_name,
          avatar_url
        )
      )
      `,
		)

		.order("created_at", {
			ascending: false,
		});

	if (error) {
		throw error;
	}

	return data;
}

export async function createTask(task: any) {
	const { data, error } = await supabase

		.from("tasks")

		.insert(task)

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function assignUsersToTask(taskId: string, profileIds: string[]) {
	const assignments = profileIds.map((profileId) => ({
		task_id: taskId,

		profile_id: profileId,
	}));

	const { data, error } = await supabase

		.from("task_assignments")

		.insert(assignments)

		.select();

	if (error) {
		throw error;
	}

	return data;
}

export async function updateTaskAssignments(
	taskId: string,
	profileIds: string[],
) {
	const { error: deleteError } = await supabase
		.from("task_assignments")
		.delete()
		.eq("task_id", taskId);

	if (deleteError) {
		throw deleteError;
	}

	if (profileIds.length > 0) {
		const assignments = profileIds.map((profileId) => ({
			task_id: taskId,
			profile_id: profileId,
		}));

		const { data, error: insertError } = await supabase
			.from("task_assignments")
			.insert(assignments)
			.select();

		if (insertError) {
			throw insertError;
		}

		return data;
	}

	return null;
}

export async function updateTask(id: string, updates: any) {
	const { data, error } = await supabase

		.from("tasks")

		.update(updates)

		.eq("id", id)

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function deleteTask(id: string) {
	const { error } = await supabase

		.from("tasks")

		.delete()

		.eq("id", id);

	if (error) {
		throw error;
	}
}
