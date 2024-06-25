import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./app/lib/db";
import authConfig from "./auth.config";
import { connectToDb } from "./app/lib/mongoose";
import { adminModel } from "./app/_models/adminModel";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    error: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      await connectToDb();
      const theUser = await adminModel.findOne({ email: user.email });
      if (theUser) {
        if (theUser.userRole == undefined) {
          return "/login?error=Access-Denied";
        } else {
          if (theUser.userRole == "USER") {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return "/login?error=No-Account";
      }
    },
    async session({ token, session, user }) {
      if (token && token.user) {
        session.user.name = token.user.name;
      }

      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
});
