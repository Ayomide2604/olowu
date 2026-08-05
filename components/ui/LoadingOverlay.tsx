"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  isLoading: boolean;
  message?: string;
  progress?: number;
  status?: "loading" | "success" | "error";
  successMessage?: string;
  errorMessage?: string;
};

export default function LoadingOverlay({
  isLoading,
  message = "Loading...",
  progress,
  status = "loading",
  successMessage = "Success!",
  errorMessage = "Something went wrong",
}: Props) {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full mx-4"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Status Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="relative"
              >
                {status === "loading" && <LoadingSpinner size="lg" />}
                {status === "success" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <CheckCircle size={32} className="text-green-600" />
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center"
                  >
                    <XCircle size={32} className="text-red-600" />
                  </motion.div>
                )}
              </motion.div>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-sm font-medium text-gray-700"
              >
                {status === "loading" && message}
                {status === "success" && successMessage}
                {status === "error" && errorMessage}
              </motion.p>

              {/* Progress Bar */}
              {status === "loading" && progress !== undefined && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  transition={{ delay: 0.2 }}
                  className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-[var(--primary)] rounded-full"
                  />
                </motion.div>
              )}

              {/* Percentage */}
              {status === "loading" && progress !== undefined && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-gray-500"
                >
                  {Math.round(progress)}%
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
