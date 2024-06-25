import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LogSchema } from "./app/_schema";
import { connectToDb } from "./app/lib/mongoose";
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
          const { email, password } = validated.data;

          const resp = await fetch(
            `https://learnflix-admin.vercel.app/api/mongops/findUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email }),
            }
          );

          const admin = await resp.json();
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
