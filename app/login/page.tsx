"use client";

import BackIcon from "@/public/assets/clientIcons/backIcon";
import { Bebas_Neue, Poppins } from "next/font/google";
import { CredentialLogIn, GoogleLogInBtn } from "../_components/auth/authElems";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });

const AdminLog = () => {
  return (
    <>
      <div className="bg-black w-screen h-screen flex">
        {/* Pixel GIF Background */}
        <div className="w-4/6 h-full absolute top-0 right-0 p-5 py-7">
          <img
            className="w-full h-full rounded-2xl rounded-tl-[150px]"
            src={"/assets/images/watch.gif"}
            alt="Lofi Girl"
          />
        </div>
        {/* Login Area */}
        <div className="w-2/6 z-10 flex relative justify-center items-center flex-col">
          {/* Logo */}
          <span
            className={
              "text-4xl text-[#DDDDDD] pt-8 px-4 absolute top-0 left-5 " +
              bebas.className
            }
          >
            <span className="bg-[linear-gradient(90deg,_#b8ffb3,_#62e759,_#24a91c)] text-transparent bg-clip-text">
              Pinay
            </span>
            flix.tv
          </span>
          {/* Back Button */}
          <span
            className={
              "text-2xl text-[#BBBBBB] pt-8 px-4 absolute top-0 right-3 flex items-center gap-3 cursor-pointer"
            }
          >
            <span className="w-5 translate-y-[-2px]">
              <BackIcon hex="#BBBBBB" />
            </span>
            <span className={"" + bebas.className}> Back </span>
          </span>
          {/* Content Area */}
          <div className="flex flex-col w-5/6 items-center gap-4 mt-14 px-8 xl:px-6">
            {/* Text Intro */}
            <span className={"text-5xl text-[#76d867] " + bebas.className}>
              Welcome Back Admin!
            </span>
            <span
              className={
                "text-base text-center text-[#a0a0a0] " + popp.className
              }
            >
              Welcome to our learning community! Whether you're here to learn or
              explore, you're in the right place. Dive into your courses and
              latest resources!
            </span>

            {/* Login Options */}
            <div className="flex flex-col w-full mt-6 gap-7">
              <GoogleLogInBtn />
              {/* "OR" partition */}
              <div className="flex w-full gap-3 items-center">
                <span className="bg-[#DDDDDD] grow h-[1px]" />
                <span className={"text-xl text-[#DDDDDD] " + bebas.className}>
                  or
                </span>
                <span className="bg-[#DDDDDD] grow h-[1px]" />
              </div>
              {/* By Email */}
              <CredentialLogIn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLog;
