"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { IoLogOutOutline } from "react-icons/io5"
import { GoSignIn } from "react-icons/go"
import { Button } from "./ui/button"
import Link from "next/link"
import { Silkscreen } from "next/font/google"
import { cn } from "@/lib/utils"

const font = Silkscreen({ style: "normal", weight: "400", subsets: ["latin"] })
const Navbar = () => {
  const { data, status } = useSession()

  return (
    <div className="w-full px-8 py-4 flex justify-between sticky z-[20] top-0 bg-dark/60 bg-opacity-30 backdrop-blur-md">
      <h1 className={cn("text-2xl font-bold", font.className)}>
        <Link href={"/"}>Game of Life</Link>
      </h1>
      <div className="flex gap-x-8">
        {data?.user && (
          <Button
            size="lg"
            variant={"ghost"}
            onClick={() => {
              signOut()
            }}
          >
            Logout <IoLogOutOutline className="ml-2 h-4 w-4" />
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
            Login <GoSignIn className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
