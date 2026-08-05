"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { Birthday } from "./BirthdayList";

type Props = {
  birthday?: Birthday | null;
  onClose: () => void;
  onSave: (data: Omit<Birthday, "id" | "created_at" | "created_by">) => void;
};

export default function BirthdayModal({ birthday, onClose, onSave }: Props) {
  const [firstName, setFirstName] = useState(birthday?.first_name || "");
  const [lastName, setLastName] = useState(birthday?.last_name || "");
  const [dateOfBirth, setDateOfBirth] = useState(birthday?.date_of_birth || "");
  const [relationship, setRelationship] = useState(birthday?.relationship || "Family");
  const [customRelationship, setCustomRelationship] = useState(birthday?.custom_relationship || "");

  useEffect(() => {
    if (birthday) {
      setFirstName(birthday.first_name);
      setLastName(birthday.last_name || "");
      setDateOfBirth(birthday.date_of_birth);
      setRelationship(birthday.relationship);
      setCustomRelationship(birthday.custom_relationship || "");
    } else {
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setRelationship("Family");
      setCustomRelationship("");
    }
  }, [birthday]);

  function handleSave() {
    if (!firstName || !dateOfBirth) return;

    onSave({
      first_name: firstName,
      last_name: lastName || null,
      date_of_birth: dateOfBirth,
      relationship,
      custom_relationship: relationship === "Other" ? customRelationship : null,
    });
  }

  return (
    <AnimatePresence>
      <div
        className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        px-5
        z-50
        "
        onClick={onClose}
      >
        <motion.div
          className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          p-6
          shadow-xl
          relative
          "
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE */}
          <motion.button
            onClick={onClose}
            className="
            absolute
            right-5
            top-5
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            hover:bg-gray-100
            "
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <X size={20} />
          </motion.button>

          <h2
            className="
            text-xl
            font-bold
            "
          >
            {birthday ? "Edit Birthday" : "Add Birthday"}
          </h2>

          <p
            className="
            text-sm
            text-gray-500
            mt-1
            "
          >
            Save important family birthdays
          </p>

          <div
            className="
            mt-6
            space-y-4
            "
          >
            <div>
              <label className="text-xs font-medium text-gray-600">First Name *</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="app-input"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name (optional)"
                className="app-input"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Date of Birth *</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="px-4
              py-3
              rounded-2xl
              border
              app-input
              appearance-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Relationship *</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="app-input"
              >
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {relationship === "Other" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="text-xs font-medium text-gray-600">Custom Relationship</label>
                <input
                  value={customRelationship}
                  onChange={(e) => setCustomRelationship(e.target.value)}
                  placeholder="e.g., Colleague, Neighbor"
                  className="app-input"
                />
              </motion.div>
            )}

            <motion.button
              onClick={handleSave}
              disabled={!firstName || !dateOfBirth}
              className="ripple-effect w-full py-3 rounded-2xl bg-[var(--primary)] text-white font-medium disabled:opacity-40"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              {birthday ? "Save Changes" : "Add Birthday"}
            </motion.button>

            <motion.button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gray-100 font-medium"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
