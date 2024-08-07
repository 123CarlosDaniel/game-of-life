import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in - Game of Life",
  description: "Log in to see your creations of the game of life",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
          {children}
        </main>
  )
}
