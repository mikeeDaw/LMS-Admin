import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  userRole: "ADMIN" | "USER";
};
declare module "next-auth" {
  interface Session {
    user: {
      userRole: ExtendedUser;
    };
  }
}
