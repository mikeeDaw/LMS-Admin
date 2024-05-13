import { login } from "@/app/_action/login";
import EmailIcon from "@/public/assets/clientIcons/emailIcon";
import { LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useTransition } from "react";

const popp = Poppins({ weight: "400", subsets: ["latin"] });
const poppSemi = Poppins({ weight: "600", subsets: ["latin"] });

const GoogleLogInBtn = () => {
  const handleClick = async () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <button
      className="flex border border-[#DDDDDD] bg-[#0a0a0a] w-full justify-center items-center gap-6 py-3 rounded-lg"
      onClick={handleClick}
    >
      <span className="w-5">
        <img src="/assets/images/google.svg" alt="Google Logo" />
      </span>
      <span className={"text-[#BBBBBB] " + poppSemi.className}>
        Continue with Google
      </span>
    </button>
  );
};

const CredentialLogIn = () => {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(() => {
      login({ sample: "text", email: "@gmail.com" });
    });
  };
  return (
    <div className="flex flex-col gap-4">
      {/* Email */}
      <div className="w-full relative">
        <input
          className={
            "border border-[#BBBBBB] text-[#DDDDDD] bg-[#0a0a0a] focus:border-[#76d867] focus:text-[#76d867] py-3 w-full text-sm outline-none pe-3 rounded-lg ps-14 " +
            popp.className
          }
          type="text"
          name="Email"
          id="Email"
          disabled={isPending}
          autoComplete="off"
          placeholder="john.doe@example.com"
        />
        <label
          htmlFor="Email"
          className="w-5 absolute top-1/2 translate-y-[-50%] left-5"
        >
          <EmailIcon hex="#575757" />
        </label>
      </div>
      {/* Password */}
      <div className="w-full relative">
        <input
          className={
            "border border-[#BBBBBB] text-[#DDDDDD] bg-[#0a0a0a] focus:border-[#76d867] focus:text-[#76d867] py-3 w-full text-sm outline-none pe-3 rounded-lg ps-14 " +
            popp.className
          }
          type="password"
          name="Email"
          disabled={isPending}
          id="Email"
          placeholder="************"
        />
        <label
          htmlFor="Email"
          className="w-5 absolute top-1/2 translate-y-[-50%] left-5"
        >
          <EmailIcon hex="#575757" />
        </label>
      </div>
      {/* Submit */}
      <button
        className={
          "bg-[#76d867] w-full py-3 rounded-lg text-[#333333] " +
          poppSemi.className
        }
        disabled={isPending}
        onClick={handleClick}
      >
        LOG IN WITH EMAIL
      </button>
    </div>
  );
};

const LogoutBtn = () => {
  const handleOut = () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <button
      className="w-full self-start px-4 py-1 flex gap-3 items-center"
      onClick={handleOut}
    >
      <LogOut size={20} />
      <span className={"text-base " + popp.className}> Log Out</span>
    </button>
  );
};

export { CredentialLogIn, GoogleLogInBtn, LogoutBtn };
