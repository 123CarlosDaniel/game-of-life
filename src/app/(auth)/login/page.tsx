import LoginForm from "@/components/form-login"
import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"

const LoginPage = async() => {
  const session = await getSession()
  console.log(session)
  const user = session?.user
  if(user){
    return redirect("/")
  }
  return (
    <LoginForm/>
  )
}

export default LoginPage