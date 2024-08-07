import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account",
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
