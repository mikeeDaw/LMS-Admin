import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LogSchema } from "./app/_schema";
import { connectToDb } from "./app/lib/mongoose";
import { findAdminbyEmail } from "./app/_models/adminModel";
import bcrypt from "bcryptjs";

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

          const passMatch = await bcrypt.compare(password, admin.password);
          console.log(password, admin.password, passMatch);
          if (passMatch) return admin;

          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
