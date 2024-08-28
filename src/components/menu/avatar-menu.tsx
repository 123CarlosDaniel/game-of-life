"use client"

import { signOut, useSession } from "next-auth/react"
import { IoLogOutOutline } from "react-icons/io5"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Avatar from "@/components/common/avatar"
import { HomeIcon, InfoCircledIcon, Pencil1Icon } from "@radix-ui/react-icons"
import CreationCreateDialog from "../new-creation/creation-dialog"

const AvatarMenu = () => {
  const { data, status } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          src={data?.user.image || "/profile.jpg"}
          altSrc={data?.user.name || "image profile"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/home"}>
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <>
              <CreationCreateDialog />
            </>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/"}>
              <InfoCircledIcon className="mr-2 h-4 w-4" />
              <span>Description</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            <IoLogOutOutline className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarMenu
