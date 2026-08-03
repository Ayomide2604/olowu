import TaskCard from "./TaskCard";
import { Task } from "@/app/(protected)/tasks/page";

type Props = {
  tasks: Task[];

  onEditAction: (task: Task) => void;

  onDeleteAction: (id: string) => void;
  onToggleAction: (id: string) => void;
};

export default function TaskList({ tasks, onEditAction, onDeleteAction, onToggleAction }: Props) {
  return (
    <div
      className="
space-y-4
"
    >
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task.task}
          date={task.date}
          time={task.time}
          assignedUsers={task.assignedUsers}
          completed={task.completed}
          onToggleAction={() => onToggleAction(task.id)}
          onEditAction={() => onEditAction(task)}
          onDeleteAction={() => onDeleteAction(task.id)}
          index={index}
        />
      ))}
    </div>
  );
}
