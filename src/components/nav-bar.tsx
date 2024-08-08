"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import Link from "next/link"
import { Silkscreen } from "next/font/google"
import { cn } from "@/lib/utils"

const font = Silkscreen({ style: "normal", weight: "400", subsets: ["latin"] })
const Navbar = () => {
  const { data, status } = useSession()

  return (
    <div className="w-full px-8 py-4 flex justify-between">
      <h1 className={cn("text-2xl font-bold", font.className)}>
        <Link href={"/"}>Game of Life</Link>
      </h1>
      <div className="flex gap-x-8">
        <Link href={"/creations"}>
          <Button size="lg" variant={"ghost"}>
            Creations
          </Button>
        </Link>
        {data?.user && (
          <Button
            size="lg"
            variant={"ghost"}
            onClick={() => {
              signOut()
            }}
          >
            Logout
          </Button>
        )}
        {!data?.user && status !== "loading" && (
          <Button
            size="lg"
            variant={"ghost"}
            onClick={() => {
              signIn()
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
