import { CheckCircle2, Clock } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";

type Props = {
  title: string;
  assignedTo: string;
  due: string;
  completed: boolean;
  overdue: boolean;
};

export default function TaskCard({
  title,
  assignedTo,
  due,
  completed,
  overdue,
}: Props) {
  return (
    <GlassCard className="p-5">
      <div
        className="
flex
items-start
justify-between
"
      >
        <div
          className="
flex
gap-3
"
        >
          <div
            className={`
w-11
h-11
rounded-2xl
flex
items-center
justify-center

${completed ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}

`}
          >
            <CheckCircle2 size={22} />
          </div>

          <div>
            <h3
              className={`
font-semibold

${completed ? "line-through text-gray-400" : "text-gray-900"}

`}
            >
              {title}
            </h3>

            <p
              className={`
flex
items-center
gap-2
text-sm
mt-2

${overdue && !completed ? "text-red-500" : "text-gray-500"}

`}
            >
              <Clock size={15} />

              {due}
            </p>
          </div>
        </div>

        <Avatar name={assignedTo} />
      </div>

      {overdue && !completed && (
        <div
          className="
mt-4
inline-flex
px-3
py-1
rounded-full
bg-red-100
text-red-600
text-xs
font-medium
"
        >
          Overdue
        </div>
      )}
    </GlassCard>
  );
}
