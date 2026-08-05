"use client";

import { motion } from "framer-motion";
import Skeleton from "./Skeleton";
import GlassCard from "./GlassCard";

export default function CardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-sm p-5 space-y-4"
    >
      <div className="flex gap-3">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Skeleton className="w-11 h-11 rounded-2xl" />
        </motion.div>
        <div className="flex-1 space-y-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Skeleton className="h-5" />
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Skeleton className="h-4" />
          </motion.div>
        </div>
      </div>
      <div className="space-y-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Skeleton className="h-4" />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "66%" }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Skeleton className="h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}
