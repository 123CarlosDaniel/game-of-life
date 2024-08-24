import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"

const roboto = Roboto({
  subsets: ["latin"],
  style: "normal",
  weight: ["400", "500", "300", "700"],
})

export const metadata: Metadata = {
  title: "Game of Life",
  description: "Game of life app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={roboto.className}>
        <SessionProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
