import TaskCard from "./TaskCard";
import { Task } from "@/app/tasks/page";

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <section
      className="
space-y-4
"
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </section>
  );
}
