import GlassCard from "@/components/ui/GlassCard";

type Props = {
  myTasks: number;
  total: number;
  completed: number;
  remaining: number;
};

export default function TaskSummary({ myTasks, total, completed, remaining }: Props) {
  return (
    <div
      className="
grid
grid-cols-2
md:grid-cols-4
gap-4
"
    >
      <GlassCard className="p-5">
        <p
          className="
text-sm
text-[#6b7280]
"
        >
          My Tasks
        </p>

        <h2
          className="
text-3xl
font-bold
mt-2
text-[#635bff]
"
        >
          {myTasks}
        </h2>
      </GlassCard>

      <GlassCard className="p-5">
        <p
          className="
text-sm
text-[#6b7280]
"
        >
          Total Tasks
        </p>

        <h2
          className="
text-3xl
font-bold
mt-2
"
        >
          {total}
        </h2>
      </GlassCard>

      <GlassCard className="p-5">
        <p
          className="
text-sm
text-[#6b7280]
"
        >
          Completed
        </p>

        <h2
          className="
text-3xl
font-bold
mt-2
text-[#22c55e]
"
        >
          {completed}
        </h2>
      </GlassCard>

      <GlassCard className="p-5">
        <p
          className="
text-sm
text-[#6b7280]
"
        >
          Remaining
        </p>

        <h2
          className="
text-3xl
font-bold
mt-2
text-[#f59e0b]
"
        >
          {remaining}
        </h2>
      </GlassCard>
    </div>
  );
}
