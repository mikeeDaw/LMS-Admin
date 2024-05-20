"use client";
import React from "react";
import { motion } from "framer-motion";

const BookIMG = () => {
  return (
    <motion.div
      animate={{ y: [-150, -120, -150] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute w-72 z-20 top-1/2 right-[20%] translate-y-[-50%]"
    >
      <img src="/assets/images/books.svg" alt="" />
    </motion.div>
  );
};

export default BookIMG;
