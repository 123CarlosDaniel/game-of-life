import { auth } from "@/auth"
import Avatar from "@/components/common/avatar"
import CreationCard from "@/components/creation/creation-card"
import { GetCreationById } from "@/services/creations"

const CreationPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const data = await GetCreationById(session?.jwt, params.id)

  return (
    <div className="flex flex-col w-fit mx-auto flex-1 border-neutral-600 border-x h-full">
      <CreationCard creation={data} />
      <div className=" w-full px-4 flex gap-x-2">
        <Avatar altSrc="" src={session ? session.user.image: "/profile.jpg"}/>
        <p className="flex-1">{data.createdAt}</p>
      </div>
    </div>
  )
}

export default CreationPage
