import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  userRole: "ADMIN" | "USER";
};
declare module "next-auth" {
  interface Session {
    user: {
      userRole: ExtendedUser;
      name: string;
    };
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: {
      userRole: ExtendedUser;
      name: string;
    };
  }
}