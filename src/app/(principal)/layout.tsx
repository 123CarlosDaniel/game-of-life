import type { Metadata } from "next"
import Navbar from "@/components/menu/nav-bar"

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
      <Navbar />
      <div className="flex flex-1 justify-center">
        <div className="hidden md:flex flex-1 min-w-[100px] max-w-[300px]">
          <div className="w-full h-full"></div>
        </div>
        <div className="w-[800px] flex-1">{children}</div>
        <div className="hidden md:flex flex-1 min-w-[100px] max-w-[300px]">
          <div className="w-full h-full"></div>
        </div>
      </div>
    </main>
  )
}
