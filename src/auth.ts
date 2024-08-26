import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { generateToken } from "./lib/generateToken"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/login'
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  callbacks: {
    async session({session, token}){
      session.jwt = generateToken(token.sub)
      session.user.id = token.sub!
      return session
    }
  }
})