"use client"

import Link from "next/link"
import { Silkscreen } from "next/font/google"
import { cn } from "@/lib/utils"
import AvatarMenu from "@/components/menu/avatar-menu"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { GoSignIn } from "react-icons/go"

const font = Silkscreen({ style: "normal", weight: "400", subsets: ["latin"] })
const Navbar = () => {
  const { data, status } = useSession()

  return (
    <div className="w-full px-8 pt-2 pb-6 flex justify-between sticky items-center z-[20] top-0 bg-dark/60 bg-opacity-30 backdrop-blur-md">
      <h1 className={cn("text-2xl font-bold", font.className)}>
        <Link href={"/"}>Game of Life</Link>
      </h1>
      {data?.user && <AvatarMenu />}
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
  )
}

export default Navbar
