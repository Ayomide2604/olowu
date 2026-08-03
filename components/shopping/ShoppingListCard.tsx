"use client";

import { useState } from "react";
import { MoreVertical, Trash2, Pencil, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import GlassCard from "@/components/ui/GlassCard";

type Props = {
  id: string;
  title: string;
  items: number;
  remaining: number;
  updated: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ShoppingListCard({
  id,
  title,
  items,
  remaining,
  updated,
  onEdit,
  onDelete,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  const router = useRouter();

  return (
    <GlassCard
      className={`
p-5
relative
cursor-pointer
${openMenu ? "z-50" : ""}
`}
    >
      <div
        onClick={() => router.push(`/shopping/${id}`)}
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
          <div
            className="
  flex
  h-12
  w-12
  items-center
  justify-center
  rounded-2xl
  bg-purple-100
  text-purple-600
"
          >
            <ShoppingCart size={24} />
          </div>

          <div>
            <h3
              className="
font-semibold
text-lg
"
            >
              {title}
            </h3>

            <p
              className="
text-sm
text-gray-500
"
            >
              {items} items · {remaining} remaining
            </p>

            <p
              className="
text-xs
text-gray-400
mt-1
"
            >
              Updated {updated}
            </p>
          </div>
        </div>

        <div
          className="
relative
"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpenMenu(!openMenu);
            }}
            className="
w-10
h-10
rounded-full
flex
items-center
justify-center
hover:bg-gray-100
"
          >
            <MoreVertical />
          </button>

          {openMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="
absolute
right-0
top-12
bg-white
border
shadow-xl
rounded-2xl
p-2
w-40
z-[100]
"
            >
              <button
                onClick={() => {
                  setOpenMenu(false);

                  onEdit();
                }}
                className="
flex
gap-2
items-center
w-full
px-3
py-2
rounded-xl
hover:bg-gray-100
text-sm
"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);

                  onDelete();
                }}
                className="
flex
gap-2
items-center
w-full
px-3
py-2
rounded-xl
hover:bg-red-50
text-red-500
text-sm
"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}