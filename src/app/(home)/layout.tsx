import type { Metadata } from "next"
import Navbar from "@/components/nav-bar"

export const metadata: Metadata = {
  title: "Home - Game of life",
  description: "Observe the creations of the game of life",
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar/>
      {children}
    </main>
  )
}