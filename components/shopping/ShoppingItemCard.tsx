"use client";

import { useState, useRef, useEffect } from "react";
import { Check, MoreVertical, Trash2, Edit2 } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";

type Props = {
  id: string;
  title: string;
  quantity: string;
  completed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ShoppingItemCard({
  id,
  title,
  quantity,
  completed,
  onToggle,
  onEdit,
  onDelete,
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
          <button
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
          >
            {completed && <Check size={16} />}
          </button>

          <div>
            <h3
              className={`
font-medium
${completed ? "line-through text-gray-400" : ""}
`}
            >
              {title}
            </h3>

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
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9ca3af] hover:bg-[#f9fafb] hover:text-[#6b7280] transition-colors duration-150"
          >
            <MoreVertical size={16} />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-8 w-32 bg-white rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-[#e5e7eb] p-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit();
                }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#f9fafb] text-sm text-[#111827] transition-colors duration-150"
              >
                <Edit2 size={14} />
                Edit
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete();
                }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#fee2e2] text-[#ef4444] text-sm transition-colors duration-150"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
