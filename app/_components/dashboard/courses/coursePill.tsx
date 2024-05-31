"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bird,
  Check,
  ChevronDown,
  CircleCheckBig,
  CircleChevronRight,
  Pencil,
  Puzzle,
  Sparkles,
  Sprout,
  Swords,
  Tent,
  X,
} from "lucide-react";
import { Bebas_Neue, Poppins } from "next/font/google";
import React, { ReactNode, useState } from "react";
import { Overlay } from "../../modals/courseModals";
import { Course } from "@/app/_types";
import { updateCourse } from "@/app/_action/courses";
import { toast } from "sonner";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });

interface CourseProp {
  data: Course;
}

interface PillProps extends CourseProp {
  delayTime: number;
}

interface StateBoolProps {
  stateSet: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DescModal extends CourseProp, StateBoolProps {}

interface TagProp {
  text: string;
  disable: boolean;
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
}
interface DropProp {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  editing: boolean;
  icon: ReactNode;
}

const tierIcon = (tier: string, size: number) => {
  switch (tier.toUpperCase()) {
    case "FREE":
      return <Bird size={size} />;
    case "PREMIUM":
      return <Tent size={size} />;
    case "ASTRO":
      return <Sparkles size={size} />;
  }
};
const diffIcon = (diff: string, size: number) => {
  switch (diff.toUpperCase()) {
    case "NOVICE":
      return <Sprout size={size} />;
    case "AMATEUR":
      return <Puzzle size={size} />;
    case "MASTER":
      return <Swords size={size} />;
  }
};

const CoursePill: React.FC<PillProps> = ({ delayTime, data }) => {
  const [showDet, setShowDet] = useState(false);

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
          {tierIcon(data.tier, 23)}
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
        {showDet && <DetailsModal stateSet={setShowDet} data={data} />}
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

const DetailsModal: React.FC<DescModal> = ({ stateSet, data }) => {
  const [title, setTitle] = useState(data.title);
  const [desc, setDesc] = useState(data.desc);
  const [tags, setTags] = useState(data.tags);
  const [tier, setTier] = useState(data.tier);
  const [diff, setDiff] = useState(data.diff);
  const [editing, setEditing] = useState(false);

  const resetForm = () => {
    setTitle(data.title);
    setDesc(data.desc);
    setTags(data.tags);
    setTier(data.tier);
    setDiff(data.diff);
  };

  const submitUpdate = async () => {
    const res = await updateCourse({
      code: data.code,
      title,
      desc,
      tags,
      tier,
      diff,
    });
    if (!res.error) {
      toast.error("Update Success!", {
        position: "top-center",
        duration: 3000,
        description: `Updates on ${data.code} has been saved.`,
        icon: (
          <span className="text-[#ffffff]">
            <CircleCheckBig />
          </span>
        ),
        classNames: {
          toast: "bg-emerald-400 border-none",
          title: "ms-4 text-white text-sm",
          description: "ms-4 text-white",
        },
      });
      console.log(res.data);
      data.tags = res.data.tags;
      data.tier = res.data.tier;
      data.title = res.data.title;
      data.diff = res.data.diff;
      data.desc = res.data.desc;
    }

    setEditing(false);
  };
  const pressEntr = (e: any) => {
    if (e.key == "Enter") {
      const val = e.target.value;
      console.log(e.target.value);
      if (val !== "") {
        setTags([...tags, val]);
        e.target.value = "";
      }
    }
  };
  return (
    <>
      <Overlay stateSet={stateSet} />
      <motion.div
        initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.7,
            type: "spring",
            bounce: 0.4,
          },
        }}
        exit={{ opacity: 0, scale: 0 }}
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex w-3/6 xl:w-[60%] h-3/4 z-30 rounded-xl bg-white"
      >
        <div className="w-1/2 h-full p-5 relative flex flex-col justify-between">
          <div className="flex gap-4 flex-col">
            {/* Tags */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap">
                <AnimatePresence>
                  {tags.map((tag, idx) => (
                    <Tags
                      text={tag}
                      disable={!editing}
                      setTag={setTags}
                      key={`Tagg${tag}`}
                    />
                  ))}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {editing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0 }}
                    className="flex items-center bg-[#a4f3b0] rounded-lg px-3"
                  >
                    <span
                      className={
                        "text-base tracking-wide pe-3 " + bebas.className
                      }
                    >
                      Tags
                    </span>
                    <input
                      type="text"
                      name="newTag"
                      className="outline-none text-sm p-2 grow bg-transparent"
                      onKeyDown={pressEntr}
                      autoComplete="off"
                    />
                    <span className="text-[#545454]">
                      <CircleChevronRight size={20} />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Description */}
            <div className="flex w-full flex-col">
              <span className={"text-lg text-[#818181] " + bebas.className}>
                Description
              </span>
              <textarea
                className={
                  "outline-0 bg-transparent text-sm w-full resize-none transition-all duration-200 " +
                  popp.className +
                  (editing ? " text-[#319e42]" : " text-black")
                }
                wrap="soft"
                value={desc}
                rows={5}
                onChange={(e) => setDesc(e.target.value)}
                disabled={!editing}
              />
            </div>
          </div>

          {/* Tier and Difficulty */}
          <div className="flex justify-evenly w-full gap-3 pb-2">
            <OptDrop
              text={tier}
              setText={setTier}
              options={["Free", "Premium", "Astro"]}
              editing={editing}
              icon={tierIcon(tier, 25)}
            />

            <span className="h-full w-[1px] bg-[#d8d8d8]" />

            <OptDrop
              text={diff}
              setText={setDiff}
              options={["Novice", "Amateur", "Master"]}
              editing={editing}
              icon={diffIcon(diff, 25)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 h-full bg-[url('/assets/images/waves.png')] p-3 pt-5 bg-cover rounded-r-xl flex flex-col gap-1 relative">
          {/* Title & Code + Edit Btn */}
          <div className="relative">
            <span className={"text-white " + popp.className}>{data.code}</span>
            <textarea
              className={
                "outline-0 bg-transparent w-full text-2xl resize-none pe-24 transition-all duration-200 " +
                bebas.className +
                (editing ? " text-[#5ce671]" : " text-white")
              }
              wrap="soft"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              disabled={!editing}
            />

            {editing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                className="absolute top-0 right-3 flex flex-col gap-2"
              >
                <button
                  className="p-2.5 bg-green-400 rounded-full text-white"
                  onClick={submitUpdate}
                >
                  <Check size={20} />
                </button>
                <button
                  className="p-2.5 bg-red-500 rounded-full text-white"
                  onClick={() => {
                    resetForm();
                    setEditing(false);
                  }}
                >
                  <X size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                className="absolute top-0 right-3 text-white p-2.5 border border-white rounded-full hover:bg-[#5dd788] hover:text-black hover:border-transparent transition-all duration-200"
                onClick={() => setEditing(true)}
              >
                <Pencil size={20} />
              </motion.button>
            )}
          </div>
          {/* Published */}
          <button className="absolute bottom-5 right-6 bg-white rounded-full px-4 py-1 text-sm">
            Publish
          </button>
        </div>
      </motion.div>
    </>
  );
};

const Tags: React.FC<TagProp> = ({ text, disable, setTag }) => {
  const clickTag = (name: string) => {
    setTag((taggers) => taggers.filter((item) => item !== name));
  };
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, type: "spring", delay: 0.3 },
      }}
      exit={{ opacity: 0, x: -20 }}
      disabled={disable}
      onClick={() => clickTag(text)}
      className="p-1"
    >
      <div className="bg-[#5ac56a] py-1 px-4 text-sm text-white rounded-full">
        {text}
      </div>
    </motion.button>
  );
};

const OptDrop: React.FC<DropProp> = ({
  text,
  setText,
  options,
  editing,
  icon,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-1 w-1/2 items-center pb-2">
      <span className={"text-lg text-[#818181] " + bebas.className}>Tier</span>
      <div
        className={
          "flex items-center gap-3 relative  " +
          (editing ? "cursor-pointer text-[#319e42]" : "")
        }
        onClick={
          editing
            ? () => {
                setOpen(!open);
              }
            : () => {}
        }
      >
        <span className={editing ? "text-[#319e42]" : "text-[#686868]"}>
          {icon}
        </span>
        <div className="border border-transparent p-1 pe-0">
          <span className={"text-lg"}> {text} </span>
        </div>
        <AnimatePresence>
          {editing && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              <ChevronDown size={20} />
            </motion.span>
          )}

          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6 } }}
              exit={{ opacity: 0 }}
              className="absolute left-[110%] bg-[#2c2c2c] py-2 flex flex-col items-start rounded-lg z-50"
              key={`${text}+${Math.random() * 999}`}
            >
              {options.map((opt) => (
                <button
                  className="ps-4 pe-8 py-0.5 text-sm w-full text-start text-white border-l-2 border-transparent transition-all hover:border-[#82e991] hover:bg-[#285c30]"
                  onClick={() => {
                    setText(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { CoursePill, EmptySection };
