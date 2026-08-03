import { Check, MoreVertical } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";

type Props = {
  name: string;

  quantity: string;

  completed: boolean;

  onToggle: () => void;

  onEdit: () => void;

  onDelete: () => void;
};

export default function ShoppingItemCard({
  name,
  quantity,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <GlassCard className="p-5">
      <div
        className="
flex
items-center
justify-between
"
      >
        <div
          className="
flex
items-center
gap-3
"
        >
          <button
            onClick={onToggle}
            className={`
w-7
h-7
rounded-full
border
flex
items-center
justify-center

${completed ? "bg-purple-600 text-white" : ""}

`}
          >
            {completed && <Check size={16} />}
          </button>

          <div>
            <h3
              className={`
font-medium
${completed ? "line-through text-gray-400" : ""}
`}
            >
              {name}
            </h3>

            <p
              className="
text-sm
text-gray-500
"
            >
              {quantity}
            </p>
          </div>
        </div>

        <button onClick={onEdit}>
          <MoreVertical />
        </button>
      </div>
    </GlassCard>
  );
}
