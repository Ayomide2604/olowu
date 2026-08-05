"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CheckSquare,
  ShoppingCart,
  CalendarDays,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "@/hooks/useScroll";

const items = [
  {
    label: "Home",
    href: "/home",
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
    label: "Events",
    href: "/events",
    icon: CalendarDays,
  },
  {
    label: "More",
    href: "/more",
    icon: Menu,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { scrollY, isScrollingUp } = useScroll();

  // Hide nav when scrolling down, show when scrolling up
  const shouldHide = scrollY > 50 && !isScrollingUp;

  return (
    <AnimatePresence mode="wait">
      {!shouldHide && (
        <motion.nav
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
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
z-50
"
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="
flex
flex-col
items-center
text-xs
gap-1
relative
"
              >
                <motion.div
                  className={`
                relative
                transition-colors
                ${isActive ? "text-purple-600" : "text-gray-500"}
              `}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon size={21} />
                </motion.div>

                <motion.span
                  className={`
                transition-colors
                ${isActive ? "text-purple-600 font-medium" : "text-gray-500"}
              `}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}