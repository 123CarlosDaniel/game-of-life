import { sign } from "jsonwebtoken"

export const generateToken = (id?: string) => {
  if(!id) return
  const sessionToken = sign(
    {
      userId: id,
    },
    process.env.AUTH_SECRET!,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  )
  return sessionToken
}
