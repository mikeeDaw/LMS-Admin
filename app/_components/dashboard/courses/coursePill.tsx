"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bird,
  Check,
  ChevronDown,
  CircleCheckBig,
  CircleChevronRight,
  CircleX,
  Ghost,
  Pencil,
  Puzzle,
  Sparkles,
  Sprout,
  Swords,
  Tent,
  Trash,
  UserRoundX,
  X,
} from "lucide-react";
import { Bebas_Neue, Poppins } from "next/font/google";
import React, { ReactNode, useEffect, useState } from "react";
import { Overlay } from "../../modals/courseModals";
import { Course } from "@/app/_types";
import {
  deleteCourse,
  getStudents,
  publishCourse,
  unenrollStudent,
  updateCourse,
} from "@/app/_action/courses";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });

interface CourseProp {
  data: Course;
}

interface PillProps extends CourseProp {
  delayTime: number;
  email: string;
}

interface StateBoolProps {
  stateSet: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DescModal extends CourseProp, StateBoolProps {
  email: string;
}

interface TagProp {
  text: string;
  disable: boolean;
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
}
interface DropProp {
  label: string;
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

const CoursePill: React.FC<PillProps> = ({ delayTime, data, email }) => {
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
        data-testid={`${data.code}`}
      >
        {/* Tier Badge */}
        <span className="bg-yellow-300 absolute rounded-full p-1 text-[#333] right-3 top-3">
          {tierIcon(data.tier, 23)}
        </span>
        <span className=" w-full h-1/2 relative pe-12 "></span>
        <div className="flex flex-col w-full justify-end px-2 py-1 h-full">
          <div className="flex flex-col">
            {/* <span className="text-xs bg-[#ffffffA9] self-start px-2 py-0.5 rounded-lg">
              {data.publisherName}
            </span> */}
            <span className="text-white truncate pe-5">{data.title}</span>
            <span className="text-[#c0c0c0] text-xs mt-0.5">{`${data.students.length} Students • ${data.publisherName}`}</span>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showDet && (
          <DetailsModal stateSet={setShowDet} data={data} email={email} />
        )}
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

const DetailsModal: React.FC<DescModal> = ({ stateSet, data, email }) => {
  const router = useRouter();
  const [title, setTitle] = useState(data.title);
  const [desc, setDesc] = useState(data.desc);
  const [tags, setTags] = useState(data.tags);
  const [tier, setTier] = useState(data.tier);
  const [diff, setDiff] = useState(data.diff);
  const [editing, setEditing] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [moduleTab, setModuleTab] = useState(true);
  const [openUnenr, setOpenUnenr] = useState(false);
  const [delId, setDelId] = useState("");
  const [delName, setDelName] = useState("");
  const creator = data.publisherEmail === email;

  const getTheStud = async (studentIds: string[]) => {
    const val = await getStudents(studentIds);
    setStudents(val.data);
  };

  useEffect(() => {
    getTheStud(data.students);
  }, []);

  const displayError = (title: string, desc: string) => {
    toast.error(title, {
      position: "top-center",
      duration: 3000,
      description: desc,
      icon: (
        <span className="text-[#ffffff]">
          <CircleX />
        </span>
      ),
      classNames: {
        toast: "bg-red-400 border-none",
        title: "ms-3 text-white",
        description: "ms-3 text-white",
      },
    });
  };

  const resetForm = () => {
    setTitle(data.title);
    setDesc(data.desc);
    setTags(data.tags);
    setTier(data.tier);
    setDiff(data.diff);
  };

  const deleteTheCourse = async (code: string) => {
    const res = await deleteCourse(code);
    if (!res.error) {
      toast("Deletion Success!", {
        position: "top-center",
        duration: 3000,
        description: `${code} has been deleted.`,
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
      setTimeout(() => {
        stateSet(false);
      }, 800);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  };

  const publishSubmit = async (to: boolean) => {
    const res = await publishCourse(data.code, to);
    if (!res.error) {
      toast("Update Success!", {
        position: "top-center",
        duration: 3000,
        description: `${data.code} has been ${
          to ? "Published" : "Unpublished"
        }.`,
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
      setTimeout(() => {
        stateSet(false);
      }, 800);
      setTimeout(() => {
        router.refresh();
      }, 1000);
      console.log(res.data);
    }
  };

  const submitUpdate = async () => {
    if (title.trim() === "" || desc.trim() === "" || tags.length === 0) {
      displayError("Invalid Values", "A value is required to update a field.");
      return;
    }
    const res = await updateCourse({
      code: data.code,
      title: title.trim(),
      desc: desc.trim(),
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
        setTags([val, ...tags]);
        e.target.value = "";
      }
    }
  };

  const unenroll = async (code: string, uid: string, name: string) => {
    const res = await unenrollStudent(uid, code);
    getTheStud(res.data.students);
    if (!res.error) {
      toast(`Unenrollment Success!`, {
        position: "top-center",
        duration: 3000,
        description: `${name} has been removed from the student list.`,
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
      router.refresh();
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
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex w-4/6 xl:w-[60%] h-3/4 z-30 rounded-xl bg-white"
      >
        {/* Left Side */}
        <div className="w-1/2 h-full p-5 relative flex flex-col justify-between gap-2">
          <div className="flex gap-2 flex-col grow">
            <div className="flex flex-col gap-4">
              {/* Tags */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap max-h-[72px] overflow-y-scroll customScroll">
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

                {editing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
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
              </div>

              {/* Description */}
              <div className="flex w-full flex-col">
                <span className={"text-lg text-[#818181] " + bebas.className}>
                  Description
                </span>
                <textarea
                  className={
                    "outline-0 bg-transparent text-sm w-full resize-none transition-all duration-200 customScroll " +
                    popp.className +
                    (editing ? " text-[#319e42]" : " text-black")
                  }
                  wrap="soft"
                  value={desc}
                  rows={5}
                  onChange={(e) => setDesc(e.target.value)}
                  disabled={!editing}
                  data-testid="course-details"
                />
              </div>

              {/* Students */}
              {students.length !== 0 ? (
                <>
                  {console.log(students)}
                  <div
                    className={
                      "flex flex-col w-full grow pe-3 overflow-y-scroll customScroll " +
                      (editing ? "h-[140px]" : "h-[180px]")
                    }
                  >
                    <span
                      className={"text-lg text-[#818181] " + bebas.className}
                    >
                      Students
                    </span>
                    <div className="w-full flex flex-col gap-2">
                      {students.map((item: any, idx) => (
                        <>
                          <div className="border w-full border-[#cecece] rounded-lg py-2 px-3 flex gap-3 items-center relative">
                            <span className="text-xs text-[#898989]">
                              {idx + 1}
                            </span>
                            <span className="text-sm grow pe-6 truncate">
                              {item.name}
                            </span>
                            <button
                              className="text-[#ff6767]"
                              onClick={
                                data.published
                                  ? () => {
                                      displayError(
                                        "Error Unenrolling Student.",
                                        "Unpublish the course before updating."
                                      );
                                    }
                                  : creator
                                  ? () => {
                                      setDelId(item._id);
                                      setDelName(item.name);
                                      setOpenUnenr(true);
                                    }
                                  : () => {
                                      displayError(
                                        "Error Unenrolling Student.",
                                        "You have no editing access to this course."
                                      );
                                    }
                              }
                              data-testid={`unenroll-student-${item._id}`}
                            >
                              <UserRoundX size={18} />
                            </button>
                          </div>
                        </>
                      ))}
                    </div>
                    {/* Confirm Unenrollment Dialog */}
                    {openUnenr && (
                      <>
                        <Overlay stateSet={setOpenUnenr} />
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0,
                            x: "-50%",
                            y: "-50%",
                          }}
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
                          className="absolute top-1/2 left-1/2 w-4/6 bg-white z-40 rounded-lg py-3 px-4"
                        >
                          <div className="w-full h-full flex flex-col gap-2">
                            <span className="text-sm text-[#787878]">
                              Continue Action
                            </span>
                            <span className="text-base">
                              Unenroll the student to this course?
                            </span>
                            <div className="flex gap-2 justify-end mt-1">
                              <button
                                className="text-sm border border-red-500 py-1 px-3 rounded-lg text-red-500"
                                onClick={() => setOpenUnenr(false)}
                              >
                                Cancel
                              </button>

                              <button
                                className="text-sm border bg-red-500 py-1 px-3 rounded-lg text-white"
                                onClick={() => {
                                  unenroll(data.code, delId, delName);
                                  setOpenUnenr(false);
                                }}
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={
                      "flex flex-col w-full grow pe-3 " +
                      (editing ? "h-[140px]" : "h-[180px]")
                    }
                  >
                    <span
                      className={"text-lg text-[#818181] " + bebas.className}
                    >
                      Students
                    </span>
                    <div className="w-full bg-[#f1f3f5] h-full rounded-xl flex flex-col items-center gap-3 justify-center">
                      <span className="text-[#a0a0a0]">
                        <Ghost size={35} />
                      </span>
                      <span className="text-[#818181]">No Students Yet...</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Tier and Difficulty */}
          <div className="flex justify-evenly w-full gap-3">
            <OptDrop
              label="Tier"
              text={tier}
              setText={setTier}
              options={["Free", "Premium", "Astro"]}
              editing={editing}
              icon={tierIcon(tier, 25)}
            />

            <span className="h-full w-[1px] bg-[#d8d8d8]" />

            <OptDrop
              label="Difficulty"
              text={diff}
              setText={setDiff}
              options={["Novice", "Amateur", "Master"]}
              editing={editing}
              icon={diffIcon(diff, 25)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 h-full bg-[url('/assets/images/waves.png')] bg-[#00000030] bg-blend-overlay bg- p-3 pt-5 bg-cover rounded-r-xl flex flex-col gap-1 relative">
          {/* Title & Code + Edit Btn */}
          <div className="relative">
            <span className={"text-white " + popp.className}>
              {data.code + " "}
              <span className="text-sm text-[#c9c9c9]">
                • by {data.publisherName}
              </span>
            </span>
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
              data-testid="course-name"
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
                className="absolute top-0 right-3 text-white p-2.5 border disabled:pointer-events-none disabled:text-[#ffffff50] disabled:border-[#ffffff50] border-white rounded-full hover:bg-[#5dd788] hover:text-black hover:border-transparent transition-all duration-200"
                onClick={
                  data.published
                    ? () => {
                        displayError(
                          "Error Updating Course",
                          "Unpublish the course before updating."
                        );
                      }
                    : creator
                    ? () => setEditing(true)
                    : () => {
                        displayError(
                          "Access Denied.",
                          "You have no permission to edit this course."
                        );
                      }
                }
                data-testid={`edit-course`}
              >
                <Pencil size={20} />
              </motion.button>
            )}
          </div>
          {/* Modules */}
          <div className="w-full flex flex-col grow gap-3 ">
            <div className="flex gap-3">
              <button
                className={`${
                  bebas.className
                } text-black text-lg bg-white py-0.5 px-3 rounded-xl  ${
                  moduleTab ? "" : "opacity-40"
                }`}
                onClick={() => setModuleTab(true)}
              >
                <span className="translate-y-[1px] block">Modules</span>
              </button>
              <button
                className={`${
                  bebas.className
                } text-black text-lg bg-white py-0.5 px-3 rounded-xl ${
                  moduleTab ? "opacity-40" : ""
                }`}
                onClick={() => setModuleTab(false)}
              >
                <span className="translate-y-[1px] block">Quizzes</span>
              </button>
            </div>
            <div className="overflow-y-scroll customScroll grow pe-4">
              <div className="w-full h-full bg-[#00000020] flex items-center rounded-xl justify-center">
                {moduleTab ? <>Modules Dito</> : <>Quizzes Dito</>}
              </div>
            </div>
          </div>
          {/* Delete */}
          <div className="flex justify-between px-2 mt-3">
            <button
              className=""
              onClick={
                data.published
                  ? () => {
                      displayError(
                        "Error Deleting Course",
                        "Unpublish the course before deletion."
                      );
                    }
                  : creator
                  ? () => setDelModal(true)
                  : () => {
                      displayError(
                        "Access Denied.",
                        "You have no permission to delete this course."
                      );
                    }
              }
              data-testid="delete-course"
            >
              <span className="text-[#ff7070]">
                <Trash />
              </span>
            </button>
            {/* Publish */}
            <button
              className=" hover:bg-[#419b4f] hover:text-white rounded-full px-4 py-1 text-sm border hover:border-transparent border-[#58c568] text-[#58c568] bg-[#00000018] transition-all duration-200"
              onClick={
                creator
                  ? data.published
                    ? () => {
                        publishSubmit(false);
                      }
                    : () => {
                        publishSubmit(true);
                      }
                  : () => {
                      displayError(
                        "Error Publishing Course",
                        "You do not have access on updating this course."
                      );
                    }
              }
              data-testid={
                data.published ? "unpublish-course" : "publish-course"
              }
            >
              {data.published ? "Unpublish" : "Publish"}
            </button>
          </div>

          {/* Delete Confirm */}
          <AnimatePresence>
            {delModal && (
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
                className="absolute bg-white left-1/2 top-1/2 py-3 px-5 shadow rounded-xl flex flex-col gap-3"
              >
                <span> Confirm Deletion? </span>
                <div className="flex gap-2">
                  <button
                    className="rounded-xl bg-[#acacac] px-4 text-white py-1"
                    onClick={() => setDelModal(false)}
                    data-testid="cancel"
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-xl bg-red-500 px-4 text-white py-1"
                    onClick={() => deleteTheCourse(data.code)}
                    data-testid="proceed"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
  label,
  text,
  setText,
  options,
  editing,
  icon,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-0 w-1/2 items-center pb-2">
      <span className={"text-lg text-[#818181] " + bebas.className}>
        {label}
      </span>
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
              {options.map((opt, idx) => (
                <button
                  className="ps-4 pe-8 py-0.5 text-sm w-full text-start text-white border-l-2 border-transparent transition-all hover:border-[#82e991] hover:bg-[#285c30]"
                  onClick={() => {
                    setText(opt);
                    setOpen(false);
                  }}
                  key={`btnn${idx}`}
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
