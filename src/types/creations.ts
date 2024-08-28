import { z } from "zod"
import { Comment } from "./comment"

export type CreationInList = {
  id: string
  ownerId: string
  ownerName: string
  ownerImage: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  reactions: number
  comments: number
  isReactionActive: boolean
}

export type Creation = {
  id: string
  ownerId: string
  ownerName: string
  ownerImage: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  reactions: number
  comments: number
  commentsList: Comment[]
  isReactionActive: boolean
}

export const CreationFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must not be empty.",
    })
    .max(50, {
      message: "Title must not be longer than 50 characters.",
    }),
  description: z
    .string()
    .min(1, {
      message: "Description must not be empty.",
    })
    .max(200, {
      message: "Description must not be longer than 200 characters.",
    }),
})

export type CreationForm = z.infer<typeof CreationFormSchema>
