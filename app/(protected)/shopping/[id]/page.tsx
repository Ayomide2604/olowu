"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Plus, MoreVertical } from "lucide-react";
import Link from "next/link";

import ShoppingItems from "@/components/shopping/ShoppingItems";
import AddItemModal from "@/components/shopping/AddItemModal";
import EditItemModal from "@/components/shopping/EditItemModal";
import EditListModal from "@/components/shopping/EditListModal";

export type ShoppingItem = {
  id: number;
  name: string;
  quantity: string;
  completed: boolean;
  createdAt: number;
};

export default function ShoppingDetailPage() {
  const [listName, setListName] = useState("Weekly Groceries");

  const [showAdd, setShowAdd] = useState(false);

  const [showEditList, setShowEditList] = useState(false);

  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  const [items, setItems] = useState<ShoppingItem[]>([
    {
      id: 1,
      name: "Milk",
      quantity: "2 bottles",
      completed: false,
      createdAt: Date.now() - 5000,
    },
    {
      id: 2,
      name: "Bread",
      quantity: "1 loaf",
      completed: true,
      createdAt: Date.now() - 20000,
    },
    {
      id: 3,
      name: "Eggs",
      quantity: "12 pieces",
      completed: false,
      createdAt: Date.now() - 10000,
    },
  ]);

  /**
   * Sort rules:
   * 1. Incomplete items first
   * 2. Completed items last
   * 3. Within each group, newest first
   */
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }

      return b.createdAt - a.createdAt;
    });
  }, [items]);

  function addItem(name: string, quantity: string) {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        quantity,
        completed: false,
        createdAt: Date.now(),
      },
    ]);

    setShowAdd(false);
  }

  function updateItem(updated: ShoppingItem) {
    setItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );

    setEditingItem(null);
  }

  function deleteItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function toggleItem(id: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    );
  }

  return (
    <div className="px-5 py-6 space-y-7">
      {/* Header */}

      <section className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/shopping">
            <ArrowLeft />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">{listName}</h1>

            <p className="text-sm text-gray-500">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <button onClick={() => setShowEditList(true)}>
          <MoreVertical />
        </button>
      </section>

      <button
        onClick={() => setShowAdd(true)}
        className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-2xl
    border
    border-dashed
    border-purple-300
    bg-purple-50
    py-3
    font-medium
    text-purple-700
    transition
    hover:bg-purple-100
  "
      >
        <Plus size={18} />
        Add Item
      </button>

      <ShoppingItems
        items={sortedItems}
        onToggle={toggleItem}
        onEdit={setEditingItem}
        onDelete={deleteItem}
      />

      <button
        onClick={() => setShowAdd(true)}
        className="
          fixed
          bottom-8
          right-6
          w-14
          h-14
          rounded-full
          bg-purple-600
          text-white
          flex
          items-center
          justify-center
          shadow-xl
        "
      >
        <Plus />
      </button>

      {showAdd && (
        <AddItemModal onClose={() => setShowAdd(false)} onAdd={addItem} />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={updateItem}
        />
      )}

      {showEditList && (
        <EditListModal
          name={listName}
          onClose={() => setShowEditList(false)}
          onSave={(value) => {
            setListName(value);
            setShowEditList(false);
          }}
        />
      )}
    </div>
  );
}
