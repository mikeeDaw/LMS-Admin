import * as z from "zod";

export const LogSchema = z.object({
  email: z.string().email().min(1, "Email is Required"),
  password: z.string().min(1, "Password is Required"),
});
