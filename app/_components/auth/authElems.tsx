"use client";
import { handleGoogSign, login } from "@/app/_action/login";
import { LogSchema } from "@/app/_schema";
import EmailIcon from "@/public/assets/clientIcons/emailIcon";
import PassIcon from "@/public/assets/clientIcons/passIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { signIn } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
// import { handleGoogSign } from "./logoutBtn";

const popp = Poppins({ weight: "400", subsets: ["latin"] });
const poppSemi = Poppins({ weight: "600", subsets: ["latin"] });

const GoogleLogInBtn = () => {
  const handleClick = () => {
    signIn("google", { callbackUrl: "/" });
  };
  // For Google Deny
  const param = useSearchParams();
  const deny = param.get("error");

  const denyFunc = () => {
    if (deny) {
      setTimeout(() => {
        toast.error("ERROR!", {
          description: deny.replace("-", " ") + ".",
          duration: 3000,
          icon: (
            <span className="text-red-500 ps-2">
              <CircleX />
            </span>
          ),
          classNames: {
            toast: "bg-[#121212] border-none",
            title: "ms-4 text-red-500",
            description: "ms-4 text-[#CCCCCC]",
            icon: "bg-black",
          },
        });
      }, 500);
    }
  };

  denyFunc();

  return (
    <button
      className="flex border border-[#DDDDDD] bg-[#0a0a0a] w-full justify-center items-center gap-6 py-3 rounded-lg"
      onClick={handleClick}
    >
      <span className="w-5">
        <img src="/assets/images/google.svg" alt="Google Logo" />
      </span>
      <span className={"text-[#BBBBBB] text-xs " + poppSemi.className}>
        Continue with Google
      </span>
    </button>
  );
};

const CredentialLogIn = () => {
  const [isPending, startTransition] = useTransition();
  const [logErr, setLogErr] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [emailCol, setEmailCol] = useState<string>("");
  const [passCol, setPassCol] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LogSchema>>({
    resolver: zodResolver(LogSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClick = (values: z.infer<typeof LogSchema>) => {
    startTransition(async () => {
      await login(values).then((result) => {
        console.log(result);
        setLogErr(result.error);
        if (result.error) {
          toast.error("ERROR!", {
            description: result.msg,
            duration: 4500,
            icon: (
              <span className="text-red-500 ps-2">
                <CircleX />
              </span>
            ),
            classNames: {
              toast: "bg-[#121212] border-none",
              title: "ms-4 text-red-500",
              description: "ms-4 text-[#CCCCCC]",
              icon: "bg-black",
            },
          });
        }
      });
    });
  };
  const iconColor = (onFoc: boolean, errField: any) => {
    if (onFoc && !(logErr || errField != undefined)) {
      return "#76d867";
    } else if (logErr || errField) {
      return "#f25d5d";
    } else return "#777777";
  };

  useEffect(() => {
    setEmailCol(iconColor(emailFocus, errors.email));
  }, [emailFocus, errors.email, logErr]);
  useEffect(() => {
    setPassCol(iconColor(passFocus, errors.password));
  }, [passFocus, errors.password, logErr]);

  return (
    <div className="flex flex-col">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleClick)}
      >
        {/* Email */}
        <div className="w-full relative">
          <input
            className={
              "border text-[#DDDDDD] bg-[#0a0a0a] py-3 w-full text-xs outline-none pe-3 rounded-lg ps-14 " +
              (logErr || errors.email != undefined
                ? "border-[#f25d5d] "
                : "border-[#BBBBBB] focus:border-[#76d867] focus:text-[#76d867] ") +
              popp.className
            }
            onFocus={() => {
              setEmailFocus(true);
            }}
            onBlurCapture={() => {
              setEmailFocus(false);
            }}
            type="text"
            id="Email"
            disabled={isPending}
            autoComplete="off"
            {...register("email")}
            placeholder="john.doe@example.com"
          />
          <label
            htmlFor="Email"
            className="w-5 absolute top-1/2 translate-y-[-50%] left-5"
          >
            <EmailIcon hex={emailCol} />
          </label>
        </div>
        {/* Password */}
        <div className="w-full relative">
          <input
            className={
              "border text-[#DDDDDD] bg-[#0a0a0a] py-3 w-full text-xs outline-none pe-3 rounded-lg ps-14 " +
              (logErr || errors.password != undefined
                ? "border-[#f25d5d] "
                : "border-[#BBBBBB] focus:border-[#76d867] focus:text-[#76d867] ") +
              popp.className
            }
            onFocus={() => {
              setPassFocus(true);
            }}
            onBlurCapture={() => {
              setPassFocus(false);
            }}
            type="password"
            disabled={isPending}
            {...register("password")}
            id="Password"
            placeholder="************"
          />
          <label
            htmlFor="Email"
            className="w-5 absolute top-1/2 translate-y-[-50%] left-5"
          >
            <PassIcon hex={passCol} />
          </label>
        </div>
        {/* Submit */}
        <button
          className={
            "bg-[#76d867] w-full text-sm py-3 rounded-lg text-[#333333] " +
            poppSemi.className
          }
          disabled={isPending}
          type="submit"
        >
          LOG IN WITH EMAIL
        </button>
      </form>
    </div>
  );
};

export { CredentialLogIn, GoogleLogInBtn };
