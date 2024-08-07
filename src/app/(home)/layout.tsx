import type { Metadata } from "next"
import Navbar from "@/components/nav-bar"

export const metadata: Metadata = {
  title: "Home",
  description: "Home of game of life",
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}