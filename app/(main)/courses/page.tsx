import React from "react";
import { Bebas_Neue, Poppins } from "next/font/google";
import Pattern from "@/public/assets/images/pattern";
import BookIMG from "@/app/_components/dashboard/courses/bookImg";
import { CoursePill } from "@/app/_components/dashboard/courses/coursePill";
import { AddCourse } from "@/app/_components/modals/addCourse";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });
const poppBold = Poppins({ weight: "600", subsets: ["latin"] });

const CoursePage = () => {
  return (
    <div
      className={"h-screen flex flex-col bg-[#5a5a5a] grow " + popp.className}
    >
      {/* Header */}
      <div className="w-full h-[69px] bg-black py-4 flex px-5 items-center">
        <span className={"text-2xl text-white " + bebas.className}>
          Courses
        </span>
      </div>
      {/* Content Area */}
      <div className="px-6 pt-7 flex flex-col gap-5">
        {/* Heading Title */}
        <div className="bg-black rounded-xl px-10 py-6 flex flex-col gap-1 relative">
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
        </div>

        <div className={"mt-3 grid px-3 w-full " + popp.className}>
          <span className={"text-xl text-[#F2F2F2] " + bebas.className}>
            Published Courses
          </span>
          <div className="flex ps-2 py-2 gap-5 overflow-x-scroll scrollbar-hide">
            <CoursePill />
            <CoursePill />
            <CoursePill />
            <CoursePill />
            <CoursePill />
            <CoursePill />
            <CoursePill />
            <CoursePill />
          </div>
        </div>
        <div className={" grid px-3 w-full " + popp.className}>
          <span className={"text-xl text-[#F2F2F2] " + bebas.className}>
            Uploaded Courses
          </span>
          <div className="flex ps-3 py-2 gap-5 overflow-x-scroll scrollbar-hide">
            {/* Upload New */}
            <AddCourse />
            <CoursePill />
            <CoursePill />
            <CoursePill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
