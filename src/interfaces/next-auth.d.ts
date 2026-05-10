import NextAuth, { User } from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
    interface User {
        user:{
            name: string,
            role: string,
            email: string,
        },
        token: string,
    }
  interface Session {
    user:User['user']
  }
}


declare module "next-auth/jwt" {
  interface JWT extends User {
  }
}