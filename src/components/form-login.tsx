"use server"

import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const LoginForm = () => {
  return (
    <div className="min-w-52">
      <div className="space-y-3 w-full">
        <h3 className="text-center text-lg">Sign in</h3>
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
          >
            <FaGithub className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
