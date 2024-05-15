import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LogSchema } from "./app/_schema";
import { connectToDb } from "./app/lib/mongoose";
import { findAdminbyEmail } from "./app/_models/adminModel";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validated = LogSchema.safeParse(credentials);

        if (validated.success) {
          await connectToDb();
          const { email, password } = validated.data;

          const admin = await findAdminbyEmail(email);
          if (!admin || !admin.password) return null;

          if (password === admin.password) return admin;

          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
