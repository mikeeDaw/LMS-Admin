"use server";

import { signOut } from "@/auth";
import { LogOut } from "lucide-react";
import { Poppins } from "next/font/google";

const popp = Poppins({ weight: "400", subsets: ["latin"] });
const poppSemi = Poppins({ weight: "600", subsets: ["latin"] });

interface Props {
  expand: boolean;
}

export const LogoutBtn: React.FC<Props> = ({ expand }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button
        className={
          "w-full px-4 py-1 flex gap-3 items-center" +
          (expand ? "" : " justify-center")
        }
        onClick={() => {
          signOut({ redirectTo: "/login" });
        }}
      >
        <LogOut size={expand ? 23 : 26} />
        <span
          className={
            "text-base overflow-hidden text-nowrap " +
            (expand ? "" : "hidden w-0") +
            popp.className
          }
        >
          Log Out
        </span>
      </button>
    </form>
  );
};
