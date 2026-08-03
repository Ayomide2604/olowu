"use client";

import { useState, useEffect } from "react";

import { X } from "lucide-react";

import {
  getProfiles,
} from "@/lib/supabase/profiles";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
};

type Task = {
  id: string;
  task: string;
  date: string;
  time: string;
  assignedUsers?: Profile[];
  completed: boolean;
  createdAt: string;
};

type Props = {
  task?: Task | null;
  onCloseAction: () => void;
  onSaveAction: (data: {
    task: string;
    date: string;
    time: string;
    assignedUsers: string[];
  }) => void;
};

export default function TaskModal({
  task,
  onCloseAction,
  onSaveAction,
}: Props) {
  const [title, setTitle] = useState(task?.task || "");
  const [date, setDate] = useState(task?.date || "");
  const [time, setTime] = useState(task?.time || "");
  const [assignedUsers, setAssignedUsers] = useState<string[]>(
    task?.assignedUsers?.map((u) => u.id) || []
  );
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    try {
      const data = await getProfiles();
      setProfiles(data || []);
    } catch (error) {
      console.error("Failed to load profiles:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSave() {
    if (!title || !date || !time) return;

    onSaveAction({
      task: title,
      date,
      time,
      assignedUsers,
    });
  }

  function toggleUser(userId: string) {
    setAssignedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }

  return (
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
    >
      <div
        className="
        bg-white
        w-full
        max-w-md
        rounded-3xl
        p-6
        shadow-xl
        relative
        max-h-[90vh]
        overflow-y-auto
        "
      >
        <button
          onClick={onCloseAction}
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
        >
          <X size={20} />
        </button>

        <h2
          className="
          text-xl
          font-bold
          "
        >
          {task ? "Edit Task" : "Create Task"}
        </h2>

        <p
          className="
          text-sm
          text-gray-500
          mt-1
          "
        >
          {task ? "Update task details" : "Add a new task for your family"}
        </p>

        <div
          className="
          mt-6
          space-y-4
          "
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              outline-none
              focus:ring-2
              focus:ring-purple-500
              app-input
              appearance-none
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              app-input
              appearance-none
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              app-input
              appearance-none
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign to</label>
            {loading ? (
              <div className="text-sm text-gray-500">Loading family members...</div>
            ) : (
              <div className="space-y-2">
                {profiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => toggleUser(profile.id)}
                    className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-2xl
                      border
                      transition-colors
                      ${assignedUsers.includes(profile.id)
                        ? "bg-purple-50 border-purple-200"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >
                    <div
                      className="
                      w-8
                      h-8
                      rounded-full
                      bg-gradient-to-br
                      from-purple-600
                      to-purple-700
                      flex
                      items-center
                      justify-center
                      text-white
                      font-semibold
                      overflow-hidden
                      border-2
                      border-white
                      "
                    >
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={`${profile.first_name} ${profile.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{profile.first_name?.charAt(0) || "U"}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {profile.first_name} {profile.last_name}
                    </span>
                    {assignedUsers.includes(profile.id) && (
                      <div
                        className="
                        ml-auto
                        w-5
                        h-5
                        rounded-full
                        bg-purple-600
                        flex
                        items-center
                        justify-center
                        "
                      >
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={!title || !date || !time}
            className="
            w-full
            py-3
            rounded-2xl
            bg-purple-600
            text-white
            font-medium
            disabled:opacity-40
            "
          >
            {task ? "Save Changes" : "Create Task"}
          </button>

          <button
            onClick={onCloseAction}
            className="
            w-full
            py-3
            rounded-2xl
            bg-gray-100
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
