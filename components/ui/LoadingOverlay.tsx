import LoadingSpinner from "./LoadingSpinner";

type Props = {
  isLoading: boolean;
  message?: string;
};

export default function LoadingOverlay({
  isLoading,
  message = "Loading...",
}: Props) {
  if (!isLoading) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-white/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        {message && (
          <p className="text-sm text-gray-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
