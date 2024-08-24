import Avatar from "@/components/common/avatar"
import CardComment from "@/components/creation/card-comment"
import { CreationAddCommentForm } from "@/components/creation/creation-comment-form"
import CreationCard from "@/components/creation/creation-card"
import { GetCreationById } from "@/services/creations"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import getSession from "@/lib/getSession"

const CreationPage = async ({ params }: { params: { id: string } }) => {
  const session = await getSession()
  const data = await GetCreationById(session?.jwt, params.id)

  return (
    <div className="flex  flex-col w-fit mx-auto flex-1 border-neutral-600 border-x">
      <div className="flex gap-x-8 p-4 items-center sticky z-30 top-0">
        <Link href="/home">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <span className="text-xl font-semibold tracking-wide">Home</span>
      </div>
      <div className="px-4">
        <CreationCard creation={data} className={{ wrapper: "pb-4" }} />
        <div className="w-full flex gap-x-2 py-4">
          <Avatar
            altSrc={session ? session.user.name : "image profile"}
            src={session ? session.user.image : "/profile.jpg"}
            className="mt-8"
          />
          <CreationAddCommentForm
            creationOwner={data.ownerName}
            creationId={data.id}
          />
        </div>
      </div>
      <div>
        {data.commentsList.map((comment) => (
          <CardComment comment={comment} key={comment.comment_id} />
        ))}
      </div>
    </div>
  )
}

export default CreationPage
