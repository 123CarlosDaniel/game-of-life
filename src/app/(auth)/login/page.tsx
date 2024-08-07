import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"

const LoginPage = async() => {
  const session = await getSession()
  const user = session?.user
  if(user){
    return redirect("/")
  }
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage