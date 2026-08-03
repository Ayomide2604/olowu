"use client";

import Link from "next/link";
import {
  Home,
  CheckSquare,
  ShoppingCart,
  CalendarDays,
  Users,
} from "lucide-react";

const items = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Shop",
    href: "/shopping",
    icon: ShoppingCart,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Family",
    href: "/family",
    icon: Users,
  },
];

export default function BottomNav() {
  return (
    <nav
      className="
fixed
bottom-5
left-5
right-5
h-16
bg-white/90
backdrop-blur-xl
rounded-3xl
shadow-xl
border
flex
items-center
justify-around
"
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className="
flex
flex-col
items-center
text-xs
text-gray-500
gap-1
"
          >
            <Icon size={21} />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
