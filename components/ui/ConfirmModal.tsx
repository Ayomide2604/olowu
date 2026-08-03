"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        px-5
        z-50
        backdrop-blur-sm
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="
          bg-white
          w-full
          max-w-sm
          rounded-3xl
          p-6
          shadow-xl
          "
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <h2
            className="
            text-xl
            font-bold
            "
          >
            {title}
          </h2>

          <p
            className="
            text-sm
            text-gray-500
            mt-2
            "
          >
            {message}
          </p>

          <div
            className="
            mt-6
            space-y-3
            "
          >
            <motion.button
              onClick={onConfirm}
              className="
              w-full
              py-3
              rounded-2xl
              bg-red-600
              text-white
              font-medium
              "
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              {confirmText}
            </motion.button>

            <motion.button
              onClick={onCancel}
              className="
              w-full
              py-3
              rounded-2xl
              bg-gray-100
              "
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              {cancelText}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
