import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  textStr: string;
  expand: boolean;
}

const NavItem: React.FC<Props> = ({ icon, textStr, expand }) => {
  return (
    <div
      className={"flex items-center gap-3 " + (expand ? "" : "justify-center")}
    >
      <span className="">{icon}</span>
      <span
        className={
          "overflow-hidden text-nowrap " + (expand ? "" : "hidden w-0")
        }
      >
        {textStr}
      </span>
    </div>
  );
};

export default NavItem;
