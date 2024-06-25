import React from "react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const Loading = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#292929] to-[#545454] flex flex-col gap-8 items-center justify-center">
      <div className="h-64 w-64 rounded-full relative">
        {/* <span className="bg-white w-full h-full absolute rounded-full opacity-10 z-20" /> */}
        {/* bg-[url('/assets/images/moon.png')] bg-cover shadow-[0_0_47px_-11px_#b8b8b8] */}
        <img
          className="w-64 drop-shadow-[2px_4px_25px_#919191] brightness-[0.8]"
          src="/assets/images/loadGIF.gif"
          alt="buwan"
        />
      </div>
      <span
        className={
          "text-3xl text-white tracking-wider loadText " + bebas.className
        }
      >
        Loading...
      </span>
    </div>
  );
};

export default Loading;
