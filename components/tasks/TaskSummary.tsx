import GlassCard from "@/components/ui/GlassCard";

type Props = {
  total: number;
  remaining: number;
};

export default function TaskSummary({ total, remaining }: Props) {
  return (
    <div
      className="
grid
grid-cols-2
gap-4
"
    >
      <GlassCard className="p-5">
        <p
          className="
text-sm
text-gray-500
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
text-gray-500
"
        >
          Remaining
        </p>

        <h2
          className="
text-3xl
font-bold
mt-2
text-purple-600
"
        >
          {remaining}
        </h2>
      </GlassCard>
    </div>
  );
}
