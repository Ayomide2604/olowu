"use client";

import { motion } from "framer-motion";

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
    <motion.div
      className={`
        ${variantClasses[variant]}
        bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200
        bg-[length:200%_100%]
        ${className}
      `}
      animate={{
        backgroundPosition: ["0% 0%", "200% 0%"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
