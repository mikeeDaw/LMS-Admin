import React from "react";

const CoursePill = () => {
  return (
    <div className="bg-[#252525] rounded-lg flex flex-col w-[270px] h-60 overflow-hidden shrink-0">
      <span className="bg-[#59a42e] w-full h-1/2 "></span>
      <div className="flex flex-col w-full px-2 py-1">
        <div className="flex flex-col">
          <span className="text-white truncate">Course Title</span>
          <span className="text-[#979797] text-xs">13 Chapters • Sample</span>
        </div>
      </div>
    </div>
  );
};

export default CoursePill;
