import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {

  interface User extends DefaultUser {
    role: string;
    token: string;
  }

  interface Session {
    user: {
      name: string;
      email: string;
      role: string;
    } & DefaultSession["user"];

    token: string;
  }
}

declare module "next-auth/jwt" {

  interface JWT extends DefaultJWT {
    role: string;
    token: string;
  }
}