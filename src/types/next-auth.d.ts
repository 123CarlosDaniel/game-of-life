import { DefaultSession } from "next-auth";
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"]
    jwt?: string
  }
  interface User {
    id: string
  }
}
