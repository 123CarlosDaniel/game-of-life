import { auth } from "@/auth"
import Avatar from "@/components/common/avatar"
import { CreationAddCommentForm } from "@/components/creation/creation-add"
import CreationCard from "@/components/creation/creation-card"
import { GetCreationById } from "@/services/creations"

const CreationPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const data = await GetCreationById(session?.jwt, params.id)

  return (
    <div className="flex flex-col w-fit mx-auto flex-1 border-neutral-600 border-x h-full">
      <CreationCard creation={data} />
      <div className=" w-full px-4 flex gap-x-2 py-4">
        <Avatar
          altSrc={session ? session.user.name : "image profile"}
          src={session ? session.user.image : "/profile.jpg"}
          className="mt-8"
        />
        <CreationAddCommentForm creationOwner={data.ownerName} />
      </div>
    </div>
  )
}

export default CreationPage
