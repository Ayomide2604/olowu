"use client";

import { useState } from "react";
import {
  CalendarDays,
  MoreVertical,
  Pencil,
  Trash2,
  Cake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import GlassCard from "@/components/ui/GlassCard";


type Props = {

  name: string;

  date: string;

  turning: number;

  relationship: string;

  fullDate?: string;

  onEdit: () => void;

  onDelete: () => void;

  index?: number;

};



export default function BirthdayCard({

  name,

  date,

  turning,

  relationship,

  fullDate,

  onEdit,

  onDelete,

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
        className={`
        p-4
        relative
        ${showMenu ? "z-50" : ""}
        `}
      >


        <div className="flex items-center justify-between">



          <div className="flex items-center gap-3">



            <div
              className="
              w-11
              h-11
              rounded-2xl
              bg-pink-100
              text-pink-600
              flex
              items-center
              justify-center
              "
            >

              <Cake size={22} />

            </div>




            <div>

              <h3 className="font-semibold">

                {name}

              </h3>


              <div
                className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
                mt-1
                "
              >

                <CalendarDays size={15} />

                {date}

              </div>



              <div className="flex items-center gap-2 mt-1">
                <p
                  className="
                  text-sm
                  text-purple-600
                  font-medium
                  "
                >

                  Turning {turning}

                </p>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500">{relationship}</span>
              </div>


            </div>


          </div>




          <div className="relative">


            <motion.button
              onClick={() =>
                setShowMenu(!showMenu)
              }
              className="
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-gray-100
              "
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >

              <MoreVertical size={20} />

            </motion.button>




            <AnimatePresence>
              {showMenu && (
                <motion.div
                  className="
                  absolute
                  right-0
                  top-10
                  w-32
                  bg-white
                  rounded-2xl
                  shadow-xl
                  border
                  p-2
                  z-[100]
                  "
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
                    className="
                    flex
                    items-center
                    gap-2
                    w-full
                    px-3
                    py-2
                    rounded-xl
                    hover:bg-gray-100
                    text-sm
                    "
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >

                    <Pencil size={15} />

                    Edit

                  </motion.button>




                  <motion.button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete();
                    }}
                    className="
                    flex
                    items-center
                    gap-2
                    w-full
                    px-3
                    py-2
                    rounded-xl
                    hover:bg-red-50
                    text-red-500
                    text-sm
                    "
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >

                    <Trash2 size={15} />

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
