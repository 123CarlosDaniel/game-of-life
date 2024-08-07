"use server"

import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const LoginForm = () => {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center w-full gap-x-2">
        <form
          action={async() => {
            "use server"
            await signIn("google", {
              redirectTo: "/",
            })
          }}
        >
          <Button
            className="w-full"
            size={"lg"}
            variant={"outline"}
          >
            <FcGoogle className="h-5 w-5" />
          </Button>
        </form>
        <form
          action={async() => {
            "use server"
            await signIn("github", {
              redirectTo: "/"
            })
          }}
        >
          <Button
            className="w-full"
            size={"lg"}
            variant={"outline"}
          >
            <FaGithub className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
