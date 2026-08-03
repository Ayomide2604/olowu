"use client";

import { useState } from "react";

import TaskHeader from "@/components/tasks/TaskHeader";
import TaskSummary from "@/components/tasks/TaskSummary";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskList from "@/components/tasks/TaskList";

export type Task = {
  id: number;
  title: string;
  assignedTo: string;
  due: string;
  completed: boolean;
  overdue: boolean;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Buy groceries",
    assignedTo: "Ayomide",
    due: "Today, 5 PM",
    completed: false,
    overdue: false,
  },

  {
    id: 2,
    title: "Clean kitchen",
    assignedTo: "Wife",
    due: "Yesterday",
    completed: false,
    overdue: true,
  },

  {
    id: 3,
    title: "Organize baby clothes",
    assignedTo: "Ayomide",
    due: "Completed",
    completed: true,
    overdue: false,
  },
];

const filters = ["All", "Today", "Upcoming", "Completed"];

export default function TasksPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    switch (activeFilter) {
      case "Today":
        return task.due.includes("Today");

      case "Upcoming":
        return !task.completed && !task.overdue;

      case "Completed":
        return task.completed;

      case "All":

      default:
        return true;
    }
  });

  return (
    <div
      className="
px-5
py-6
space-y-7
"
    >
      <TaskHeader />

      <TaskSummary
        total={tasks.length}
        remaining={tasks.filter((task) => !task.completed).length}
      />

      <TaskFilters
        filters={filters}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      <TaskList tasks={filteredTasks} />
    </div>
  );
}
