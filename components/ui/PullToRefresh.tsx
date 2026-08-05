"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { RefreshCw } from "lucide-react";

type Props = {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  threshold?: number;
};

export default function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
}: Props) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const startY = useRef(0);
  const currentY = useMotionValue(0);

  const rotate = useTransform(currentY, [0, threshold], [0, 360]);
  const opacity = useTransform(currentY, [0, threshold], [0, 1]);
  const scale = useTransform(currentY, [0, threshold], [0.8, 1]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || window.scrollY > 0) return;

    const currentTouchY = e.touches[0].clientY;
    const diff = currentTouchY - startY.current;

    if (diff > 0) {
      const progress = Math.min(diff / threshold, 1);
      setPullProgress(progress);
      currentY.set(diff);
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling) return;

    setIsPulling(false);

    if (pullProgress >= 1 && !isRefreshing) {
      setIsRefreshing(true);
      currentY.set(threshold);

      await onRefresh();

      setIsRefreshing(false);
      animate(currentY, 0, { duration: 0.3 });
    } else {
      animate(currentY, 0, { duration: 0.3 });
    }

    setPullProgress(0);
  };

  useEffect(() => {
    const handleTouchMoveGlobal = () => {
      if (window.scrollY > 0 && isPulling) {
        setIsPulling(false);
        setPullProgress(0);
        animate(currentY, 0, { duration: 0.2 });
      }
    };

    window.addEventListener("touchmove", handleTouchMoveGlobal);
    return () => window.removeEventListener("touchmove", handleTouchMoveGlobal);
  }, [isPulling, currentY]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <motion.div
        style={{
          y: currentY,
          opacity: useTransform(currentY, [0, 20], [0, 1]),
        }}
        className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-50"
      >
        <motion.div
          style={{ rotate, opacity, scale }}
          className="w-10 h-10 rounded-full bg-[var(--primary-soft)] flex items-center justify-center shadow-lg"
        >
          <RefreshCw
            size={20}
            className="text-[var(--primary)]"
            style={{
              animation: isRefreshing ? "spin 1s linear infinite" : "none",
            }}
          />
        </motion.div>
      </motion.div>

      {children}
    </div>
  );
}
