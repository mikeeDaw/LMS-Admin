"use client";
import React, { useState } from "react";
import { AnimatePresence, interpolate, motion } from "framer-motion";
import { CircleX, Lollipop, Plus, Rabbit } from "lucide-react";
import { Overlay } from "../../modals/courseModals";
import { Bebas_Neue, Poppins } from "next/font/google";
import { Toaster } from "sonner";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

interface Course {
  title: string;
  code: string;
  desc: string;
  tags: string[];
  tier: string;
  diff: string;
  publisherEmail: string;
  publisherName: string;
  students: string[];
  published: false;
}

interface PillProps {
  delayTime: number;
  data: Course;
}

interface StateBoolProps {
  stateSet: React.Dispatch<React.SetStateAction<boolean>>;
}

const CoursePill: React.FC<PillProps> = ({ delayTime, data }) => {
  const [showDet, setShowDet] = useState(false);
  console.log(data);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            duration: 0.6,
            delay: delayTime,
            bounce: 0.4,
          },
        }}
        whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
        onClick={() => {
          setShowDet(!showDet);
        }}
        className="bg-[url('/assets/images/waves.png')] bg-cover shadow-[inset_0px_-82px_61px_-49px_#000000a6] rounded-lg flex flex-col w-56 h-48 overflow-hidden shrink-0 p-2 relative"
      >
        {/* Tier Badge */}
        <span className="bg-yellow-300 absolute rounded-full p-1 text-[#333] right-3 top-3">
          <Rabbit size={23} />
        </span>
        <span className=" w-full h-1/2 relative "></span>
        <div className="flex flex-col w-full justify-end px-2 py-1 h-full">
          <div className="flex flex-col">
            {/* <div className="flex flex-wrap">
              {data.tags.map((item) => (
                <div className="p-0.5">
                  <div className="text-[9px] p-1 px-2 rounded-full bg-white">
                    {" "}
                    {item}{" "}
                  </div>{" "}
                </div>
              ))}
            </div> */}
            <span className="text-white truncate pe-5">{data.title}</span>
            <span className="text-[#c0c0c0] text-xs mt-0.5">{`${data.students.length} Students`}</span>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showDet && <DetailsModal stateSet={setShowDet} />}
      </AnimatePresence>
    </>
  );
};

const EmptySection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{
        opacity: 0.5,
        y: 0,
        transition: {
          type: "spring",
          duration: 0.6,
          delay: 0.15,
          bounce: 0.4,
        },
      }}
      className="bg-[#6b6b6b] rounded-lg flex justify-center items-center flex-col w-full h-48 overflow-hidden shrink-0 p-7 relative"
    >
      <div className="border-2 border-[#858585] w-full h-full rounded-lg flex items-center justify-center ">
        <span className="text-lg text-[#e0e0e08e]">
          No Published Courses Yet...
        </span>
        <img
          className="w-32 opacity-65"
          src="/assets/images/pug.gif"
          alt="Pug"
        />
      </div>
    </motion.div>
  );
};

const DetailsModal: React.FC<StateBoolProps> = ({ stateSet }) => {
  return (
    <>
      <Overlay stateSet={stateSet} />
      <motion.div
        initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.6,
            type: "spring",
            bounce: 0.5,
          },
        }}
        exit={{ opacity: 0, scale: 0 }}
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex w-3/6 xl:w-[60%] h-3/4 z-30 rounded-xl bg-white"
      >
        <div className="w-1/2 h-full p-3 pt-5 relative">
          <div className="flex w-full">but</div>
        </div>
        <div className="w-1/2 h-full bg-[url('/assets/images/waves.png')] p-3 pt-5 bg-cover rounded-r-xl relative">
          {/* <span className="absolute top-3 right-5 text-red-500 flex flex-col p-3">
            <CircleX size={30} />
          </span> */}
          <textarea
            className={
              "outline-0 bg-transparent text-white w-full text-2xl resize-none " +
              bebas.className
            }
            wrap="soft"
            value={"Title Here sdfsdjfshe owruoiruwoiruofdgdieru "}
          />
        </div>
      </motion.div>
    </>
  );
};

export { CoursePill, EmptySection };
