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
      const theUser = await adminModel.findById(user.id);
      console.log("In SignIn:", theUser);
      if (theUser.userRole == undefined) {
        await adminModel.findByIdAndUpdate(
          { _id: user.id },
          {
            $set: { userRole: "ADMIN" },
          },
          { strict: false }
        );

        return true;
      } else {
        if (theUser.userRole == "USER") {
          return false;
        } else {
          return true;
        }
      }
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
});
