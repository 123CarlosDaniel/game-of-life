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
      <Navbar />
      <div className="flex justify-center">
        <div className="hidden md:flex flex-1 min-w-[100px] max-w-[300px]">
          <div className="w-full h-full">Ad</div>
        </div>
        <div className="w-[800px]">{children}</div>
        <div className="hidden md:flex flex-1 min-w-[100px] max-w-[300px]">
          <div className="w-full h-full">Ad</div>
        </div>
      </div>
    </main>
  )
}
