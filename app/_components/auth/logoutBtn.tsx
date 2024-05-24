// import { signIn, signOut } from "next-auth/react";
import { handleOut } from "@/app/_action/login";
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
        await handleOut("/login");
      }}
    >
      <button
        className={
          "w-full px-4 py-1 flex gap-2 items-center" +
          (expand ? "" : " justify-center")
        }
        type="submit"
      >
        <LogOut size={expand ? 21 : 24} />
        <span
          className={
            "text-sm overflow-hidden text-nowrap " +
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
