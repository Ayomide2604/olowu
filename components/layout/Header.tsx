"use client";

import { Bell } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScroll as useWindowScroll } from "@/hooks/useScroll";

export default function Header() {
  const { scrollY } = useWindowScroll();
  const { scrollYProgress } = useScroll();

  // Header shrinks based on scroll position
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const headerPadding = useTransform(scrollYProgress, [0, 0.1], ["20px", "12px"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <motion.header
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/50"
      style={{
        scale: headerScale,
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
        opacity: headerOpacity,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
        </div>

        <motion.button
          className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <Bell size={20} />
        </motion.button>
      </div>
    </motion.header>
  );
}
