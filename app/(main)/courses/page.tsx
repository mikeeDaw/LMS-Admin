import React from "react";
import { Bebas_Neue, Poppins } from "next/font/google";
import Pattern from "@/public/assets/images/pattern";
import BookIMG from "@/app/_components/dashboard/courses/bookImg";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });
const poppBold = Poppins({ weight: "600", subsets: ["latin"] });

const CoursePage = () => {
  return (
    <div
      className={"h-screen flex flex-col bg-cyan-200 grow " + popp.className}
    >
      {/* Header */}
      <div className="w-full h-[69px] bg-black py-4 flex px-5 items-center">
        <span className={"text-2xl text-white " + bebas.className}>
          Courses
        </span>
      </div>
      {/* Content Area */}
      <div className="px-6 pt-10">
        <div className="bg-black rounded-xl px-10 py-7 flex flex-col gap-1 relative">
          <div className="absolute inset-0 z-0 opacity-60 rounded-xl">
            <Pattern />
          </div>
          <BookIMG />
          <span className={"text-3xl z-10 text-white " + poppBold.className}>
            Courses Catalog
          </span>
          <span className="z-10 text-sm text-white">
            Manage and create your educational materials for your students.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
