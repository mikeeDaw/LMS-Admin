import { login } from "@/app/_action/login";
import { LogSchema } from "@/app/_schema";
import EmailIcon from "@/public/assets/clientIcons/emailIcon";
import PassIcon from "@/public/assets/clientIcons/passIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/auth";
import { Poppins } from "next/font/google";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  const xxx = () => {
    console.log(errors);
  };
  const handleClick = (values: z.infer<typeof LogSchema>) => {
    startTransition(async () => {
      await login(values).then((result) => {
        console.log(result);
      });
    });
  };
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
              "border text-[#DDDDDD] bg-[#0a0a0a] py-3 w-full text-sm outline-none pe-3 rounded-lg ps-14 " +
              (errors.email != undefined
                ? "border-[#f25d5d] "
                : "border-[#BBBBBB] focus:border-[#76d867] focus:text-[#76d867] ") +
              popp.className
            }
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
            <EmailIcon
              hex={errors.email != undefined ? "#f25d5d" : "#777777"}
            />
          </label>
        </div>
        {/* Password */}
        <div className="w-full relative">
          <input
            className={
              "border text-[#DDDDDD] bg-[#0a0a0a] py-3 w-full text-sm outline-none pe-3 rounded-lg ps-14 " +
              (errors.email != undefined
                ? "border-[#f25d5d] "
                : "border-[#BBBBBB] focus:border-[#76d867] focus:text-[#76d867] ") +
              popp.className
            }
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
            <PassIcon hex={errors.email != undefined ? "#f25d5d" : "#777777"} />
          </label>
        </div>
        {/* Submit */}
        <button
          className={
            "bg-[#76d867] w-full py-3 rounded-lg text-[#333333] " +
            poppSemi.className
          }
          disabled={isPending}
          type="submit"
          onClick={xxx}
        >
          LOG IN WITH EMAIL
        </button>
      </form>
    </div>
  );
};

export { CredentialLogIn, GoogleLogInBtn };
