"use client";
import React, { ReactNode } from "react";
import { Bebas_Neue, Poppins } from "next/font/google";
import { ArrowRight, Triangle, UserRound } from "lucide-react";
import { motion } from "framer-motion";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });
const poppSemi = Poppins({ weight: "600", subsets: ["latin"] });

interface Props {
  LIcon: ReactNode;
  header: string;
  count: string;
  accColor: string;
  delayAnim: number;
}

const Pill: React.FC<Props> = ({
  LIcon,
  header,
  count,
  accColor,
  delayAnim,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          duration: 0.8,
          delay: delayAnim,
          bounce: 0.4,
        },
      }}
      whileHover={{ scale: 1.08, transition: { duration: 0.5 } }}
      className={
        "bg-[#2d2d2d] rounded-lg flex grow items-center relative overflow-hidden pillCont " +
        popp.className
      }
    >
      {/* Circle Stuff */}
      <span
        className="absolute h-[100px] w-[100px] z-0 top-[-20px] left-[-35px] rounded-full transition-all duration-500 pillCir"
        style={{ backgroundColor: accColor }}
      />
      <span className="ps-4 pe-6 z-10">{LIcon}</span>
      <div className="flex flex-col w-full py-3 ps-2 z-10">
        <span className={"text-[#AAAAAA] text-sm changeCol " + bebas.className}>
          {header}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-xl text-[#DDDDDD] tracking-wider changeCol ">
            {count}
          </span>
        </div>
      </div>
      <span
        className="px-4 pe-5 h-full flex items-center z-20 arrow"
        style={{ color: accColor }}
      >
        <ArrowRight size={30} />
      </span>
    </motion.div>
  );
};

export default Pill;
