"use client";
import React, { useState } from "react";
import { Bebas_Neue, Poppins } from "next/font/google";
import {
  Brain,
  ChevronsLeft,
  Flag,
  Gem,
  GraduationCap,
  Home,
  LogOut,
} from "lucide-react";
import NavItem from "./navItems";
import { LogoutBtn } from "../auth/logoutBtn";
import { motion } from "framer-motion";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });
const poppSemi = Poppins({ weight: "600", subsets: ["latin"] });

interface Props {
  name: string;
}

const NavigationBar: React.FC<Props> = ({ name }) => {
  const [expand, setExpand] = useState(true);
  return (
    <motion.div
      className={
        "bg-black flex flex-col h-screen text-[#BBBBBB] transition-all border-r border-[#888888] " +
        (expand ? "w-[210px] " : "w-[90px] ") +
        popp.className
      }
    >
      {/* Nav Heading */}
      <div
        className={
          "border-b border-[#888888] items-center w-full flex px-5 py-4 " +
          (expand ? "justify-between" : "justify-center")
        }
      >
        <span className={expand ? "" : "hidden"}>Logo</span>
        <button
          className="bg-[#151515] p-1.5 rounded-lg"
          onClick={() => setExpand(!expand)}
        >
          <ChevronsLeft
            className={expand ? "" : "rotate-180 " + "transition-all"}
          />
        </button>
      </div>
      <div className="flex flex-col justify-between py-5 grow gap-5">
        {/* Mga content */}
        <div className="flex flex-col gap-5">
          {/* Profile Drop */}
          <div className="px-4">
            <div
              className={
                "bg-[#151515] rounded-lg flex gap-4 items-center " +
                (expand ? "p-4" : "p-1 py-4 justify-center ")
              }
            >
              {/* <span
              className={
                "rounded-full bg-white " +
                (expand ? " w-[36px] h-[36px]" : "w-[36px] h-[36px]")
              }
            /> */}
              <img
                src="https://media.tenor.com/TmbNLu_okcUAAAAM/grey-matter-ben10.gif"
                className="w-[36px] h-[36px] rounded-full"
              />
              <div className={"flex flex-col " + (expand ? "" : " hidden")}>
                <span
                  className={
                    "text-lg translate-y-[3px] overflow-hidden text-nowrap " +
                    bebas.className +
                    (expand ? " " : " w-0 h-0")
                  }
                >
                  {name}
                </span>
                <span
                  className={
                    "text-xs translate-y-[-3px] overflow-hidden text-nowrap " +
                    (expand ? "" : "absolute w-0 h-0")
                  }
                >
                  Master
                </span>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div
            className={
              "flex flex-col border-b pb-8 border-[#8888887F] " +
              (expand ? "gap-0" : "gap-2")
            }
          >
            <span
              className={
                "text-base translate-y-1 mb-2 px-4 overflow-hidden text-nowrap " +
                bebas.className +
                (expand ? "" : " w-0 h-0")
              }
            >
              ANALYTICS
            </span>
            <NavItem
              expand={expand}
              icon={<Home size={expand ? 21 : 24} />}
              textStr="Dashboard"
              redirect="/"
            />
            <NavItem
              expand={expand}
              icon={<Flag size={expand ? 21 : 24} />}
              textStr="Reports"
              redirect="#"
            />
          </div>

          {/* Application */}
          <div
            className={
              "flex flex-col border-b pb-8 border-[#8888887F] " +
              (expand ? "gap-0" : "gap-2")
            }
          >
            <span
              className={
                "text-base translate-y-1 mb-2 px-4 overflow-hidden text-nowrap " +
                bebas.className +
                (expand ? "" : " w-0 h-0")
              }
            >
              Application
            </span>
            <NavItem
              expand={expand}
              icon={<GraduationCap size={expand ? 22 : 25} />}
              textStr="Courses"
              redirect="/courses"
            />
            <NavItem
              expand={expand}
              icon={<Brain size={expand ? 21 : 24} />}
              textStr="Students"
              redirect="#"
            />
            <NavItem
              expand={expand}
              icon={<Gem size={expand ? 21 : 24} />}
              textStr="Kahit Ano"
              redirect="#"
            />
          </div>
        </div>
        {/* Bottom Area */}
        <div className="flex flex-col">
          <LogoutBtn expand={expand} />
        </div>
      </div>
    </motion.div>
  );
};

export default NavigationBar;
