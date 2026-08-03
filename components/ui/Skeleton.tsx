export default function Skeleton({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "circle" | "rounded";
}) {
  const variantClasses = {
    default: "rounded-lg",
    circle: "rounded-full",
    rounded: "rounded-2xl",
  };

  return (
    <div
      className={`
        ${variantClasses[variant]}
        bg-gray-200
        animate-pulse
        ${className}
      `}
    />
  );
}
