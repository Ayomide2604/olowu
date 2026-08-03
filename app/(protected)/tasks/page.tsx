"use client";

import { useState } from "react";

import TaskHeader from "@/components/tasks/TaskHeader";
import TaskSummary from "@/components/tasks/TaskSummary";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskList from "@/components/tasks/TaskList";
import TaskModal from "@/components/tasks/TaskModal";

export type Task = {
  id: number;

  task: string;

  date: string;

  time: string;

  assignedTo: "Ayomide" | "Asher" | "Boluwatife";

  completed: boolean;

  createdAt: number;
};

const initialTasks: Task[] = [
  {
    id: 1,
    task: "Buy groceries",
    date: "2026-08-03",
    time: "5:00 PM",
    assignedTo: "Ayomide",
    completed: false,
    createdAt: Date.now() - 3000,
  },

  {
    id: 2,
    task: "Prepare baby's clothes",
    date: "2026-08-04",
    time: "8:00 PM",
    assignedTo: "Boluwatife",
    completed: false,
    createdAt: Date.now() - 2000,
  },

  {
    id: 3,
    task: "Clean kitchen",
    date: "2026-08-01",
    time: "6:00 PM",
    assignedTo: "Asher",
    completed: true,
    createdAt: Date.now() - 1000,
  },
];

const filters = ["All", "Today", "Upcoming", "Completed"];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [activeFilter, setActiveFilter] = useState("All");

  const [showTaskModal, setShowTaskModal] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((task) => {
    switch (activeFilter) {
      case "Today":
        return task.date === new Date().toISOString().split("T")[0];

      case "Upcoming":
        return !task.completed;

      case "Completed":
        return task.completed;

      case "All":

      default:
        return true;
    }
  });

  function saveTask(data: {
    task: string;
    date: string;
    time: string;
    assignedTo: "Ayomide" | "Asher" | "Boluwatife";
  }) {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((item) =>
          item.id === editingTask.id
            ? {
                ...item,
                ...data,
              }
            : item,
        ),
      );

      setEditingTask(null);
    } else {
      setTasks((prev) => [
        ...prev,

        {
          id: Date.now(),

          task: data.task,

          date: data.date,

          time: data.time,

          assignedTo: data.assignedTo,

          completed: false,

          createdAt: Date.now(),
        },
      ]);
    }

    setShowTaskModal(false);
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
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
      <TaskHeader onAdd={() => setShowTaskModal(true)} />

      <TaskSummary
        total={tasks.length}
        remaining={tasks.filter((task) => !task.completed).length}
      />

      <TaskFilters
        filters={filters}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onEdit={(task) => {
          setEditingTask(task);

          setShowTaskModal(true);
        }}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />

      {showTaskModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowTaskModal(false);

            setEditingTask(null);
          }}
          onSave={saveTask}
        />
      )}
    </div>
  );
}
