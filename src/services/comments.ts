"use server"

import { endPoints } from "./endpoints"
import {
  createFetchError,
  createNotFoundError,
  createUnauthorizedError,
} from "@/lib/errors"
import { CommentForm } from "@/types/comment"
import { CustomResponse } from "@/types/custom-response"

export async function PostComment(
  creationId: string,
  data: CommentForm,
  jwt: string | undefined
) {
  try {
    const response = await fetch(endPoints.comments.create(creationId), {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
    if (response.status === 404) {
      throw createNotFoundError()
    }
    if (response.status === 401) {
      throw createUnauthorizedError()
    }
    if (!response.ok) {
      throw createFetchError(response.status)
    }
    return {
      error: false,
      status: response.status,
      body: await response.json(),
    } as CustomResponse
  } catch (error: unknown) {
    const customError = error as CustomResponse
    return customError
  }
}
