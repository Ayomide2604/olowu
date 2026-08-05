"use client";

import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="
flex
items-center
justify-between
px-5
pt-5
pb-3
"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <div className="flex items-center gap-3">
      </div>

      <motion.button
        className="
w-11
h-11
rounded-full
bg-white
shadow-sm
flex
items-center
justify-center
"
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
    </motion.header>
  );
}
