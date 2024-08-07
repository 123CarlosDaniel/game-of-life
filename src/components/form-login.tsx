import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Silkscreen } from "next/font/google"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const font = Silkscreen({style: "normal", weight: "400", subsets: ["latin"]})

const LoginForm = () => {
  return (
    <div className="min-w-56 space-y-8">
      <h3 className="text-center text-sm leading-8">
        Connect to the <br />
        <span
          className={cn("text-4xl font-bold text-teal-300", font.className)}
        >
          Game of Life
        </span>
      </h3>
      <div className="space-y-3 w-full">
        <form
          action={async () => {
            "use server"
            await signIn("google", {
              redirectTo: "/",
            })
          }}
        >
          <Button
            variant={"outline"}
            className="w-full flex gap-x-4"
            size={"lg"}
          >
            <FcGoogle className="h-5 w-5" /> Connect with Google
          </Button>
        </form>
        <form
          action={async () => {
            "use server"
            await signIn("github", {
              redirectTo: "/",
            })
          }}
        >
          <Button
            variant={"outline"}
            className="w-full flex gap-x-4"
            size={"lg"}
          >
            <FaGithub className="h-5 w-5" /> Connect with GitHub
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
