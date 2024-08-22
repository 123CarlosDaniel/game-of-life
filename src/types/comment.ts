import { z } from "zod"

export type Comment = {
  comment_id: string
  comment_opinion: string
  comment_owner_id: string
  comment_createdAt: string
  comment_updatedAt: string
  comment_owner_name: string
  comment_owner_image: string
}

export const CommentFormSchema = z.object({
  opinion: z
    .string()
    .min(1, {
      message: "Comment must not be empty.",
    })
    .max(200, {
      message: "Comment must not be longer than 200 characters.",
    }),
})

export type CommentForm = z.infer<typeof CommentFormSchema>