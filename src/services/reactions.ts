"use server"

import { CustomResponse } from "@/types/custom-response"
import { endPoints } from "./endpoints"
import { createFetchError, createNotFoundError, createUnauthorizedError } from "@/lib/errors"
import { revalidateTag } from "next/cache"

export async function addReaction(jwt: string | undefined, creationId: string) {
  try {
    const response = await fetch(endPoints.reactions.create(creationId), {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
      method: "POST",
    })
    if (response.status === 404) {
      throw createNotFoundError()
    }
    if (response.status === 401) {
      throw createUnauthorizedError()
    }
    if(!response.ok) {
      throw createFetchError(response.status)
    }
    revalidateTag("creations_by_id")
    return {
      status: response.status,
      message: "Reaction added",
      body: null,
    } as CustomResponse
  }
  catch (error: unknown) {
    const customError = error as CustomResponse
    return customError
  }
}

export async function deleteReaction(jwt: string | undefined, creationId: string) {
  try {
    const response = await fetch(endPoints.reactions.delete(creationId), {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
      method: "DELETE",
    })
    if (response.status === 404) {
      throw createNotFoundError()
    }
    if (response.status === 401) {
      throw createUnauthorizedError()
    }
    if(!response.ok) {
      throw createFetchError(response.status)
    }
    revalidateTag("creations_by_id")
    return {
      status: response.status,
      message: "Reaction deleted",
      body: null,
    } as CustomResponse
  }
  catch (error: unknown) {
    const customError = error as CustomResponse
    return customError
  }
}