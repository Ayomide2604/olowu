"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Task = {
  id: number;
  task: string;
  date: string;
  time: string;
  assignedTo: "Ayomide" | "Asher" | "Boluwatife";
  completed: boolean;
  createdAt: number;
};

type Props = {
  task?: Task | null;

  onClose: () => void;

  onSave: (data: {
    task: string;
    date: string;
    time: string;
    assignedTo: "Ayomide" | "Asher" | "Boluwatife";
  }) => void;
};

export default function TaskModal({ task, onClose, onSave }: Props) {
  const [taskName, setTaskName] = useState(task?.task ?? "");

  const [date, setDate] = useState(task?.date ?? "");

  const [time, setTime] = useState(task?.time ?? "");

  const [assignedTo, setAssignedTo] = useState<
    "Ayomide" | "Asher" | "Boluwatife"
  >(task?.assignedTo ?? "Ayomide");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleSave() {
    if (!taskName.trim()) return;

    onSave({
      task: taskName.trim(),

      date,

      time,

      assignedTo,
    });
  }

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/40
      flex
      items-center
      justify-center
      px-5
      "
    >
      <div
        className="
        relative
        w-full
        max-w-md
        rounded-3xl
        bg-white
        p-6
        shadow-xl
        "
      >
        {/* Close button */}

        <button
          onClick={onClose}
          className="
          absolute
          right-5
          top-5
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
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
          mt-1
          text-sm
          text-gray-500
          "
        >
          Manage family tasks
        </p>

        <div
          className="
          mt-6
          space-y-4
          "
        >
          {/* Task */}

          <div>
            <label
              className="
              text-sm
              font-medium
              "
            >
              Task
            </label>

            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Example: Buy groceries"
              autoFocus
              className="
              mt-2
              w-full
              rounded-2xl
              border
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-purple-500
              app-input
              "
            />
          </div>

          {/* Date */}

          <div>
            <label
              className="
              text-sm
              font-medium
              "
            >
              Due Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="
  app-input
  appearance-none
              mt-2
              w-full
              rounded-2xl
              border
              px-4
              py-3
  "
            />
          </div>

          {/* Time */}

          <div>
            <label
              className="
              text-sm
              font-medium
              "
            >
              Due Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="
   app-input
   appearance-none
              mt-2
              w-full
              rounded-2xl
              border
              px-4
              py-3
  "
            />
          </div>

          {/* Assigned To */}

          <div>
            <label
              className="
              text-sm
              font-medium
              "
            >
              Assigned To
            </label>

            <select
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(
                  e.target.value as "Ayomide" | "Asher" | "Boluwatife",
                )
              }
              className="
              app-input
              mt-2
              w-full
              rounded-2xl
              border
              px-4
              py-3
              "
            >
              <option>Ayomide</option>

              <option>Asher</option>

              <option>Boluwatife</option>
            </select>
          </div>

          {/* Buttons */}

          <div
            className="
            pt-3
            space-y-3
            "
          >
            <button
              onClick={handleSave}
              disabled={!taskName.trim()}
              className="
              w-full
              rounded-2xl
              bg-purple-600
              py-3
              font-medium
              text-white
              disabled:opacity-40
              "
            >
              {task ? "Save Changes" : "Create Task"}
            </button>

            <button
              onClick={onClose}
              className="
              w-full
              rounded-2xl
              bg-gray-100
              py-3
              font-medium
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
