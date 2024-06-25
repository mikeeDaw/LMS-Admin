"use client";
import Pattern from "@/public/assets/images/pattern";
import React from "react";
import BookIMG from "./bookImg";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppBold = Poppins({ weight: "600", subsets: ["latin"] });

const CourseHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          duration: 0.6,
          bounce: 0.4,
        },
      }}
      className="bg-black rounded-xl px-10 py-5 flex flex-col gap-1 relative"
    >
      <div className="absolute inset-0 z-0 opacity-50 rounded-xl">
        <Pattern />
      </div>
      <BookIMG />
      <span className={"text-2xl z-10 text-white " + poppBold.className}>
        Courses Catalog
      </span>
      <span className="z-10 text-sm text-white">
        Manage and create your educational materials for your students.
      </span>
    </motion.div>
  );
};

export default CourseHeader;
