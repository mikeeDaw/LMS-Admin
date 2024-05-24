"use client";
import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Overlay } from "../../modals/addCourse";

const CoursePill = () => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
        className="bg-[#252525] rounded-lg flex flex-col w-56 h-48 overflow-hidden shrink-0"
      >
        <span className="bg-[#59a42e] w-full h-1/2 relative "></span>
        <div className="flex flex-col w-full px-2 py-1">
          <div className="flex flex-col">
            <span className="text-white truncate">Course Title</span>
            <span className="text-[#979797] text-xs">13 Chapters • Sample</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export { CoursePill };
