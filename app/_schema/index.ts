import * as z from "zod";

export const LogSchema = z.object({
  email: z.string().min(1, "Email is Required").email(),
  password: z.string().min(1, "Password is Required"),
});
