"use client";

import { useState } from "react";

import BirthdayHeader from "@/components/birthday/BirthdayHeader";
import BirthdayList, { Birthday } from "@/components/birthday/BirthdayList";
import BirthdayModal from "@/components/birthday/BirthdayModal";

const initialBirthdays: Birthday[] = [
  {
    id: 1,
    name: "Asher",
    date: "2026-04-18",
    relationship: "Son",
    notes: "First birthday 🎉",
    createdAt: new Date(Date.now() - 3000),
  },
  {
    id: 2,
    name: "Boluwatife",
    date: "1998-12-10",
    relationship: "Family",
    notes: "",
    createdAt: new Date(Date.now() - 2000),
  },
];

export default function BirthdaysPage() {
  const [birthdays, setBirthdays] = useState<Birthday[]>(initialBirthdays);
  const [showModal, setShowModal] = useState(false);
  const [editingBirthday, setEditingBirthday] = useState<Birthday | null>(null);

  function saveBirthday(data: Omit<Birthday, "id" | "createdAt">) {
    if (editingBirthday) {
      setBirthdays((prev) =>
        prev.map((item) =>
          item.id === editingBirthday.id
            ? {
              ...item,
              ...data,
            }
            : item,
        ),
      );

      setEditingBirthday(null);
    } else {
      setBirthdays((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
          createdAt: new Date(),
        },
      ]);
    }

    setShowModal(false);
  }

  function deleteBirthday(id: number) {
    setBirthdays((prev) => prev.filter((item) => item.id !== id));
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
        onDelete={deleteBirthday}
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