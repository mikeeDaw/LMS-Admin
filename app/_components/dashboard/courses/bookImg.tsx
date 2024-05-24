"use client";
import React from "react";
import { motion } from "framer-motion";

const BookIMG = () => {
  return (
    <motion.div
      animate={{ y: [-120, -100, -120] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="absolute w-52 z-20 top-1/2 right-[15%] translate-y-[-50%]"
    >
      {/* <img src="/assets/images/books.svg" alt="" /> */}
      <img src="/assets/images/books.svg" alt="" />
    </motion.div>
  );
};

export default BookIMG;
