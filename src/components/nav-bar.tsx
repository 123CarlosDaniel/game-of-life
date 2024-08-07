"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <div className="w-full px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">Game of Life</h1>
      <div className="flex gap-x-8">
        <Button
          size="lg"
          variant={"ghost"}
          onClick={() => {
            signOut({ callbackUrl: "/login" })
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Navbar
