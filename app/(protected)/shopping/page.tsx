"use client";

import { useState } from "react";

import ShoppingHeader from "@/components/shopping/ShoppingHeader";
import ShoppingLists from "@/components/shopping/ShoppingLists";
import CreateListModal from "@/components/shopping/CreateListModal";
import DeleteConfirmModal from "@/components/shopping/DeleteConfirmModal";
import EditListModal from "@/components/shopping/EditListModal";
export type ShoppingList = {
  id: number;
  title: string;
  items: number;
  remaining: number;
  updated: string;
};

export default function ShoppingPage() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([
    {
      id: 1,
      title: "Weekly Groceries",
      items: 8,
      remaining: 3,
      updated: "Today",
    },

    {
      id: 2,
      title: "Baby Supplies",
      items: 5,
      remaining: 2,
      updated: "Yesterday",
    },

    {
      id: 3,
      title: "Home Essentials",
      items: 12,
      remaining: 8,
      updated: "August 1",
    },
  ]);

  const [showCreate, setShowCreate] = useState(false);

  const [editingList, setEditingList] = useState<ShoppingList | null>(null);

  const [deletingList, setDeletingList] = useState<ShoppingList | null>(null);

  function createList(name: string) {
    const newList: ShoppingList = {
      id: Date.now(),
      title: name,
      items: 0,
      remaining: 0,
      updated: "Just now",
    };

    setShoppingLists((prev) => [...prev, newList]);
    setShowCreate(false);
  }

  function updateList(id: number, name: string) {
    setShoppingLists((prev) =>
      prev.map((list) =>
        list.id === id
          ? {
              ...list,
              title: name,
              updated: "Just now",
            }
          : list,
      ),
    );

    setEditingList(null);
  }

  function deleteList() {
    if (!deletingList) return;

    setShoppingLists((prev) =>
      prev.filter((list) => list.id !== deletingList.id),
    );

    setDeletingList(null);
  }

  return (
    <div
      className="
px-5
py-6
space-y-7
"
    >
      <ShoppingHeader onAdd={() => setShowCreate(true)} />

      <ShoppingLists
        lists={shoppingLists}
        onEdit={(list) => setEditingList(list)}
        onDelete={(list) => setDeletingList(list)}
      />

      {showCreate && (
        <CreateListModal
          onClose={() => setShowCreate(false)}
          onCreate={createList}
        />
      )}

      {editingList && (
        <EditListModal
          name={editingList.title}
          onClose={() => setEditingList(null)}
          onSave={(newName) => {
            updateList(editingList.id, newName);
          }}
        />
      )}

      {deletingList && (
        <DeleteConfirmModal
          listName={deletingList.title}
          onClose={() => setDeletingList(null)}
          onDelete={deleteList}
        />
      )}
    </div>
  );
}
