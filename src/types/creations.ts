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
