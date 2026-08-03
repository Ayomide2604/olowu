import Skeleton from "./Skeleton";
import GlassCard from "./GlassCard";

export default function CardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-sm p-5 space-y-4">
      <div className="flex gap-3">
        <Skeleton className="w-11 h-11 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
