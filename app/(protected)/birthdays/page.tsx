"use client";

import { useState, useEffect } from "react";

import BirthdayHeader from "@/components/birthday/BirthdayHeader";
import BirthdayList, { Birthday } from "@/components/birthday/BirthdayList";
import BirthdayModal from "@/components/birthday/BirthdayModal";
import { getBirthdays, createBirthday, updateBirthday, deleteBirthday } from "@/lib/supabase/birthdays";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function BirthdaysPage() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBirthday, setEditingBirthday] = useState<Birthday | null>(null);

  useEffect(() => {
    loadBirthdays();
  }, []);

  async function loadBirthdays() {
    try {
      const data = await getBirthdays();
      setBirthdays(data);
    } catch (error) {
      console.error("Error loading birthdays:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveBirthday(data: Omit<Birthday, "id" | "created_at" | "created_by">) {
    try {
      if (editingBirthday) {
        const updated = await updateBirthday(editingBirthday.id, data);
        setBirthdays((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
        setEditingBirthday(null);
      } else {
        const created = await createBirthday(data);
        setBirthdays((prev) => [...prev, created]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving birthday:", error);
    }
  }

  async function handleDeleteBirthday(id: string) {
    try {
      await deleteBirthday(id);
      setBirthdays((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting birthday:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div
      className="
      px-5
      py-6
      space-y-7
      "
    >
      <BirthdayHeader onAdd={() => setShowModal(true)} />

      <BirthdayList
        birthdays={birthdays}
        onEdit={(birthday) => {
          setEditingBirthday(birthday);
          setShowModal(true);
        }}
        onDelete={handleDeleteBirthday}
      />

      {showModal && (
        <BirthdayModal
          birthday={editingBirthday}
          onClose={() => {
            setShowModal(false);
            setEditingBirthday(null);
          }}
          onSave={saveBirthday}
        />
      )}
    </div>
  );
}
