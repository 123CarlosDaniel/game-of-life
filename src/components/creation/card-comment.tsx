import { Comment } from "@/types/comment"
import Avatar from "../common/avatar"
import { formatDistanceToNow } from "date-fns"

const CardComment = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex gap-x-2 w-full first:border-t border-b border-neutral-600 px-4 py-4">
      <Avatar
        altSrc={comment.comment_owner_name}
        src={comment.comment_owner_image}
      />
      <div className="flex-1">
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex gap-x-2 items-center text-neutral-400">
              <span className="font-semibold text-dark-light">
                {comment.comment_owner_name}
              </span>
              <span>·</span>
              <span>
                {formatDistanceToNow(new Date(comment.comment_createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-dark-dark">{comment.comment_opinion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComment
