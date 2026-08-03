import TaskCard from "./TaskCard";
import { Task } from "@/app/tasks/page";

type Props = {
  tasks: Task[];

  onEdit: (task: Task) => void;

  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function TaskList({ tasks, onEdit, onDelete, onToggle }: Props) {
  return (
    <div
      className="
space-y-4
"
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task.task}
          date={task.date}
          time={task.time}
          assignedTo={task.assignedTo}
          completed={task.completed}
          onToggle={() => onToggle(task.id)}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
}
