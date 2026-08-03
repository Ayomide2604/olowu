import { Plus } from "lucide-react";

type Props = {
  onAdd: () => void;
};

export default function TaskHeader({ onAdd }: Props) {
  return (
    <div
      className="
flex
items-center
justify-between
"
    >
      <div>
        <h1
          className="
text-2xl
font-bold
"
        >
          Tasks
        </h1>

        <p
          className="
text-sm
text-gray-500
"
        >
          Manage family tasks
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
flex
items-center
gap-2
rounded-2xl
bg-purple-600
px-4
py-3
text-white
font-medium
"
      >
        <Plus size={18} />
        Add Task
      </button>
    </div>
  );
}
