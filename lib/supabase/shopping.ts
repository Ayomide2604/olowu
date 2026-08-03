import { supabase } from "@/lib/supabase/client";

// ==========================
// SHOPPING LISTS
// ==========================

export async function getShoppingLists() {
	const { data, error } = await supabase

		.from("shopping_lists")

		.select(
			`
      *,
      shopping_items(
        id,
        title,
        quantity,
        category,
        completed,
        created_at
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

export async function createShoppingList(name: string, userId: string) {
	const { data, error } = await supabase

		.from("shopping_lists")

		.insert({
			name,

			created_by: userId,
		})

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function updateShoppingList(id: string, name: string) {
	const { data, error } = await supabase

		.from("shopping_lists")

		.update({
			name,

			updated_at: new Date().toISOString(),
		})

		.eq("id", id)

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function deleteShoppingList(id: string) {
	const { error } = await supabase

		.from("shopping_lists")

		.delete()

		.eq("id", id);

	if (error) {
		throw error;
	}
}

export async function getShoppingList(id: string) {
	const { data, error } = await supabase

		.from("shopping_lists")

		.select("*")

		.eq("id", id)

		.single();

	if (error) {
		throw error;
	}

	return data;
}

// ==========================
// SHOPPING ITEMS
// ==========================

export async function getShoppingItems(listId: string) {
	const { data, error } = await supabase

		.from("shopping_items")

		.select("*")

		.eq("list_id", listId)

		.order("created_at", {
			ascending: false,
		});

	if (error) throw error;

	return data;
}

export async function addShoppingItem(item: {
	list_id: string;

	title: string;

	quantity?: string;

	category?: string;

	created_by?: string;
}) {
	const { data, error } = await supabase

		.from("shopping_items")

		.insert(item)

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function updateShoppingItem(
	id: string,
	updates: {
		title?: string;

		quantity?: string;

		category?: string;

		completed?: boolean;
	},
) {
	const { data, error } = await supabase

		.from("shopping_items")

		.update({
			...updates,

			updated_at: new Date().toISOString(),
		})

		.eq("id", id)

		.select()

		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function deleteShoppingItem(id: string) {
	const { error } = await supabase

		.from("shopping_items")

		.delete()

		.eq("id", id);

	if (error) {
		throw error;
	}
}

export async function getUncompletedShoppingItemsCount() {
	const { data, error, count } = await supabase
		.from("shopping_items")
		.select("*", { count: "exact", head: true })
		.eq("completed", false);

	if (error) {
		throw error;
	}

	return count || 0;
}
