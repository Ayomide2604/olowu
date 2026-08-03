"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Clock,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";

function humanizeDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
  if (diffDays <= 7) return `in ${diffDays} days`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

function isOverdue(dateStr: string, timeStr: string): boolean {
  const now = new Date();
  const dueDate = new Date(`${dateStr}T${timeStr}`);
  return dueDate < now;
}


type Props = {

  task: string;

  date: string;

  time: string;


  assignedUsers: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string | null;
  }[];


  completed: boolean;


  onEditAction: () => void;

  onDeleteAction: () => void;

  onToggleAction: () => void;

  index?: number;

};



export default function TaskCard({

  task,

  date,

  time,

  assignedUsers,

  completed,

  onEditAction,

  onDeleteAction,

  onToggleAction,

  index = 0,

}: Props) {


  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        delay: index * 0.05,
      }}
    >
      <GlassCard
        className={`p-4 relative transition-all duration-200 hover:shadow-lg ${showMenu ? "z-50" : ""}`}
      >
        <div className="flex items-start gap-3">
          <motion.button
            onClick={onToggleAction}
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${completed
              ? "bg-[#dcfce7] text-[#22c55e]"
              : "bg-[#eeecff] text-[#635bff] hover:bg-[#e0deff]"
              }`}
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
                ease: "easeInOut",
              }}
            >
              <CheckCircle2 size={20} />
            </motion.div>
          </motion.button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-base truncate ${completed
                ? "line-through text-[#9ca3af]"
                : "text-[#111827]"
                }`}
            >
              {task}
            </h3>

            <div className="mt-2 flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eeecff] border border-[#635bff]">
                <span className="text-xs font-medium text-[#635bff]">{humanizeDate(date)}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eeecff] border border-[#635bff]">
                <Clock size={12} className="text-[#635bff]" />
                <span className="text-xs font-medium text-[#635bff]">{formatTime(time)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 relative flex-shrink-0">
            {!completed && isOverdue(date, time) && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fee2e2] border border-[#ef4444]">
                <span className="text-[10px] font-semibold text-[#ef4444]">OVERDUE</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {assignedUsers && assignedUsers.length > 0 ? (
                  <>
                    {assignedUsers.slice(0, 3).map((user) => (
                      <div
                        key={user.id}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#635bff] to-[#5548ff] flex items-center justify-center text-white text-xs font-semibold border-2 border-white overflow-hidden"
                      >
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt={`${user.first_name} ${user.last_name}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{user.first_name?.charAt(0) || "U"}</span>
                        )}
                      </div>
                    ))}
                    {assignedUsers.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-[#f9fafb] flex items-center justify-center text-[#6b7280] text-xs font-medium border-2 border-white">
                        +{assignedUsers.length - 3}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#f9fafb] flex items-center justify-center border-2 border-[#e5e7eb]">
                    <span className="text-[#9ca3af] text-[10px]">-</span>
                  </div>
                )}
              </div>

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
                        onEditAction();
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
                      <Pencil size={14} />
                      Edit
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setShowMenu(false);
                        onDeleteAction();
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
        </div>
      </GlassCard>
    </motion.div>
  );
}