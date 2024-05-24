"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  CircleChevronRight,
  CircleX,
  Plus,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

interface DropProps {
  choices: string[];
  stateSet: React.Dispatch<React.SetStateAction<any>>;
  setHov: React.Dispatch<React.SetStateAction<boolean>>;
}
interface StateBoolProps {
  stateSet: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Overlay: React.FC<StateBoolProps> = ({ stateSet }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#404040] z-30 opacity-60"
      onClick={() => stateSet(false)}
    />
  );
};

export const ModalAdd: React.FC<StateBoolProps> = ({ stateSet }) => {
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [theTags, setTheTags] = useState<string[]>([]);
  const [hovDiff, setHovDiff] = useState(false);
  const [hovTier, setHovTier] = useState(false);
  const [diffVal, setDiffVal] = useState("Beginner");
  const [tierVal, setTierVal] = useState("Free");

  const pressEntr = (e: any) => {
    if (e.key == "Enter") {
      if (tag !== "") {
        setTheTags([...theTags, tag]);
        setTag("");
      }
    }
  };
  const clickArr = () => {
    if (tag !== "") {
      setTheTags([...theTags, tag]);
      setTag("");
    }
  };
  const clickTag = (val: string) => {
    setTheTags((taggers) => taggers.filter((item) => item !== val));
  };
  useEffect(()=>{
    console.log(hovTier)

  }, [hovTier])

  return (
    <>
      <motion.div
        key={"AddmodChild"}
        initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
        animate={{
          opacity: 1,
          transition: { duration: 0.8, type: "spring" },
          scale: 1,
          x: "-50%",
          y: "-50%",
        }}
        exit={{ opacity: 0, scale: 0 }}
        className="absolute top-1/2 left-1/2 h-fit w-1/2 xl:w-5/12 translate-x-[-50%!important] translate-y-[-46%] z-50 rounded-2xl flex flex-col gap-5 py-5 px-8"
        style={{
          background:
            "conic-gradient(from -25deg at 40% 0, #64da6a 0deg 180deg, black 90deg 180deg)",
        }}
      >
        {/* Heading */}
        <div className="w-full flex justify-between items-center">
          <span className={"text-white text-2xl " + bebas.className}>
            Add Course
          </span>
          <button
            className="z-10 text-[#3d3d3d] hover:text-red-600"
            onClick={() => stateSet(false)}
          >
            <CircleX size={35} />
          </button>
        </div>
        {/* Inputs and Save Button */}
        <div className="w-full flex gap-5">
          {/* Inputs */}
          <div className="flex grow z-10 gap-4 border border-[#606060] rounded-xl px-3">
            <div className="relative w-[57%]">
              <input
                type="text"
                className="w-full bg-transparent outline-none pb-1 pt-6 placeholder:text-[#656565]  text-white text-sm"
                id="cTitle"
                placeholder="Intro to Programming"
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                htmlFor="cTitle"
                className={
                  "absolute top-1 text-[#bbbbbb] left-0 text-sm " +
                  bebas.className
                }
              >
                Course Title
              </label>
            </div>
            <div className="relative w-[43%]">
              <input
                type="text"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#666666] pb-1 pt-6 text-black text-right"
                id="cCode"
                autoComplete="off"
                placeholder="CS00231"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <label
                htmlFor="cCode"
                className={
                  "absolute top-1 right-0 text-[#3c3c3c] " + bebas.className
                }
              >
                Course Code
              </label>
            </div>
          </div>
          <button className="z-10 bg-[#4eac53] text-white rounded-2xl px-4 text-sm hover:bg-[#232323] transition-all duration-200">
            Save
          </button>
        </div>
        {/* Tags */}
        <div className="w-full z-10 py-2 flex items-center gap-4 ">
          <div className="flex items-center border border-[#606060] w-4/12 rounded-full">
            <span
              className={
                "text-center ps-4 pe-3 pt-2 pb-1.5 text-[#bbbbbb] text-base border-r border-[#606060] " +
                bebas.className
              }
            >
              Tags
            </span>
            <div className="relative">
              <input
                type="text"
                className="w-full outline-none bg-transparent text-white text-sm ps-3 pe-10 placeholder:text-xs placeholder:text-[#767676]"
                placeholder="type here..."
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={pressEntr}
              />
              <button
                className="text-[#7c7c7c] absolute right-2.5 top-1/2 translate-y-[-50%] hover:text-[#64da6a] transition-all duration-200"
                onClick={clickArr}
              >
                <CircleChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-scroll scrollbar-hide w-8/12">
            <AnimatePresence>
              {theTags.map((item, idx) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { type: "spring", duration: 1 },
                  }}
                  exit={{ opacity: 0, x: -10 }}
                  key={`Tag${item}`}
                  onClick={() => clickTag(item)}
                  className="bg-[#ffffffe2] py-2 ps-4 pe-3 text-sm rounded-full flex items-center gap-2"
                >
                  <span>{item}</span>
                  <span className="translate-y-[1px]">
                    <X size={17} />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
        {/* Description and DropDowns */}
        <div className="w-full flex gap-10 justify-between z-10">
          <div className="relative">
            <textarea
              name="description"
              className="bg-transparent border border-[#606060] outline-none text-sm rounded-xl resize-none text-[#eeeeee] p-3 pt-7 placeholder:text-[#606060] placeholder:text-sm"
              id=""
              cols={45}
              rows={3}
              placeholder="type here..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <div
              className={
                "absolute top-2 text-[#aaaaaa] left-3 " + bebas.className
              }
            >
              Description
            </div>
          </div>
          {/* DropDowns */}
          <div className="flex flex-col w-[40%] gap-2 h-full">
            {/* Tier */}
            <div
              className="border border-[#606060] w-full rounded-xl px-3 pb-1 pt-4 relative"
              onMouseEnter={() => setHovTier(true)}
              onMouseLeave={() => setHovTier(false)}
            >
              <span
                className={
                  " text-[#444444] absolute top-1 text-xs " + bebas.className
                }
              >
                LearnFlix Tier
              </span>
              <div className="flex w-full justify-between">
                <span>{tierVal}</span>
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
              <AnimatePresence>
                {hovTier && (
                  <DropdownMenu
                    key={"Drop2Tier"}
                    choices={["Free", "Premium", "Astro"]}
                    stateSet={setTierVal}
                    setHov={setHovTier}
                  />
                )}
              </AnimatePresence>
            </div>
            {/* Difficulty */}
            <div
              className="border border-[#606060] w-full rounded-xl px-3 pb-1 pt-4 relative"
              onMouseEnter={() => setHovDiff(true)}
              onMouseLeave={() => setHovDiff(false)}
            >
              <span
                className={
                  " text-[#444444] absolute top-1 text-xs " + bebas.className
                }
              >
                Difficulty
              </span>
              <div className="flex w-full justify-between">
                <span>{diffVal}</span>
                <span>
                  <ChevronDown size={20} />
                </span>
              </div>
              <AnimatePresence>
                {hovDiff && (
                  <DropdownMenu
                    key={"Drop2Diff"}
                    choices={["Beginner", "Amateur", "Professional"]}
                    stateSet={setDiffVal}
                    setHov={setHovDiff}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const DropdownMenu: React.FC<DropProps> = ({ choices, stateSet, setHov }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", duration: 0.8 },
        }}
        exit={{ opacity: 0, y: -5 }}
        className="bg-[#212121] z-20 border border-[#696969] absolute w-full left-0 top-full mt-2 rounded-xl py-2 dropRes"
      >
        <div
          className="flex flex-col pt-1 "
          onMouseLeave={() => {
            console.log(false);
            setHov(false);
          }}
        >
          {choices.map((item) => (
            <button
              key={`Choice${item}`}
              className="text-sm text-left text-white px-3 py-1 border-l-2 border-transparent hover:border-[#31742b] hover:bg-[#454545] transition-all duration-200"
              onClick={() => {
                stateSet(item);
                setHov(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export const AddCourse = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <AnimatePresence>
        {openModal && <Overlay key={"OverlayMod"} stateSet={setOpenModal} />}
        {openModal && <ModalAdd key={"AddModal"} stateSet={setOpenModal} />}
        <motion.div
          whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
          className="bg-[#DDDDDD30] rounded-lg flex flex-col w-56 h-48 overflow-hidden shrink-0 border-4 border-dashed justify-center items-center"
          onClick={() => setOpenModal(true)}
        >
          <div className="flex flex-col gap-3 w-1/2 ">
            <span className="text-[#696969] self-center p-2 block bg-white rounded-full">
              <Plus size={35} />
            </span>
            <span className="text-white text-center">New Course</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
