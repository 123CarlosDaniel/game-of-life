import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Hello, Next.js!
      </h1>
      <form action={async()=>{
        "use server"
        await signOut({
          redirectTo: "/login",
        })
      }}>
        <Button size="lg">
          Logout
        </Button>
      </form>
    </main>
  );
}
