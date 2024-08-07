"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

const Navbar = () => {
  const { data, status } = useSession()

  return (
    <div className="w-full px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">Game of Life</h1>
      <div className="flex gap-x-8">
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
