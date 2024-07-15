import NavigationBar from "../_components/navbar/navBar";
import { Bebas_Neue } from "next/font/google";
import { auth } from "@/auth";
import Pill from "../_components/dashboard/pills";
import {
  Brain,
  DollarSign,
  GraduationCap,
  Radiation,
  UserRound,
} from "lucide-react";
import { connectToDb } from "../lib/mongoose";
import { countAdmin, countStudents } from "../_models/adminModel";
import { countCourses } from "../_models/courseModel";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default async function Home() {
  const sesh = await auth();
  await connectToDb();
  const students = await countStudents();
  const teach = await countAdmin();
  const courses = await countCourses();
  console.log("studs:", students);
  return (
    <>
      <div className="w-full h-screen bg-[#696969] flex flex-col gap-1">
        {/* Header */}
        <div className="w-full h-[60px] bg-black py-4 flex px-5 items-center">
          <span className={"text-2xl text-white " + bebas.className}>
            Dashboard
          </span>
        </div>
        {/* Content ni Dashboard */}
        <div className="grow w-full px-4 flex flex-col gap-6 p-5">
          {/* Pills */}
          <div className="w-full flex gap-7 flex-wrap">
            <Pill
              header="Students"
              count={String(students)}
              accColor="#c5791e"
              LIcon={<Brain size={30} color="#FFFFFF" />}
              delayAnim={0.0}
              goTo="#"
            />
            <Pill
              header="Instructors"
              count={String(teach)}
              accColor="#67bb16"
              LIcon={<UserRound size={30} color="#FFFFFF" />}
              delayAnim={0.2}
              goTo="#"
            />
            <Pill
              header="Courses"
              count={String(courses)}
              accColor="#0a61b5"
              LIcon={<GraduationCap size={32} color="#FFFFFF" />}
              delayAnim={0.4}
              goTo="/courses"
            />
            <Pill
              header="Revenue"
              count={"$8,540"}
              accColor="#9a1ac7"
              LIcon={<DollarSign size={30} color="#FFFFFF" />}
              delayAnim={0.6}
              goTo="#"
            />
            <Pill
              header="Wala pa "
              count="6,334"
              accColor="#1d80ad"
              LIcon={<Radiation size={30} color="#FFFFFF" />}
              delayAnim={0.8}
              goTo="#"
            />
          </div>
          {/* Charts */}
          <div className="bg-[#222222] grow flex items-center text-white text-xl justify-center">
            *other graphs dito*
          </div>
        </div>
      </div>
    </>
  );
}
