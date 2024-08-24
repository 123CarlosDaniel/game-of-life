import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>
        Hello, Next.js!
      </h1>
      <Button asChild size={"lg"} variant={"ghost"}>
        <Link href="/home">Home</Link>
      </Button>
    </main>
  );
}
