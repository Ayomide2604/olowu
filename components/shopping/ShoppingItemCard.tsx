"use client";

import { useState, useRef, useEffect } from "react";
import { Check, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import GlassCard from "@/components/ui/GlassCard";

type Props = {
  id: string;
  title: string;
  quantity: string;
  completed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
};

export default function ShoppingItemCard({
  id,
  title,
  quantity,
  completed,
  onToggle,
  onEdit,
  onDelete,
  index = 0,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      animate={{
        scale: completed ? [1, 1.2, 1] : 1,
      }}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <GlassCard className={`p-5 relative transition-all duration-200 hover:shadow-lg ${showMenu ? "z-50" : ""}`}>
        <div
          className="
flex
items-center
justify-between
"
        >
          <div
            className="
flex
items-center
gap-3
"
          >
            <motion.button
              onClick={onToggle}
              className={`
w-7
h-7
rounded-full
border
flex
items-center
justify-center

${completed ? "bg-purple-600 text-white" : ""}

`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <motion.div
                animate={{
                  scale: completed ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  type: "tween",
                  duration: 0.3,
                }}
              >
                {completed && <Check size={16} />}
              </motion.div>
            </motion.button>

            <div>
              <motion.h3
                className={`
font-medium
${completed ? "line-through text-gray-400" : ""}
`}
                animate={{
                  opacity: completed ? 0.5 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {title}
              </motion.h3>

              <p
                className="
text-sm
text-gray-500
"
              >
                {quantity}
              </p>
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            <motion.button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9ca3af] hover:bg-[#f9fafb] hover:text-[#6b7280] transition-colors duration-150"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <MoreVertical size={16} />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  className="absolute right-0 top-8 w-32 bg-white rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-[#e5e7eb] p-1 z-[100]"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <motion.button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit();
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#f9fafb] text-sm text-[#111827] transition-colors duration-150"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Edit2 size={14} />
                    Edit
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete();
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#fee2e2] text-[#ef4444] text-sm transition-colors duration-150"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
