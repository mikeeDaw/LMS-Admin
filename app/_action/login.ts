"use server";

import * as z from "zod";
import { LogSchema } from "../_schema";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (values: any) => {
  console.log(values);
  const validated = LogSchema.safeParse(values);

  if (!validated.success) {
    return { error: true, msg: "Invalid Input" };
  }

  const { email, password } = validated.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: true, msg: "Invalid Credentials" };
        default:
          return { error: true, msg: "Access Denied." };
      }
    }
    throw error;
  }

  // Login Successful. No Errors
  return { error: false, msg: "Login Successful" };
};

export const handleGoogSign = async (url: string) => {
  await signIn("google", { callbackUrl: url });
};

export const handleOut = async (url: string) => {
  await signOut({ redirectTo: url });
};
