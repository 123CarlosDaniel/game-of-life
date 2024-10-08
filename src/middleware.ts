import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth: middleware } = NextAuth(authConfig)

export default middleware

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
