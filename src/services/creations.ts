"use server"

import { Creation, CreationInList } from "@/types/creations"
import { endPoints } from "./endpoints"
import { GetListResponse } from "@/types/GetList"
import { createFetchError, createNotFoundError } from "@/lib/errors"
import { notFound, redirect } from "next/navigation"
import { CustomResponse } from "@/types/custom-response"

export async function GetCreationsList(
  jwt: string | undefined,
  pageNumber: number = 1,
  perPage: number = 10,
  sortBy: "asc" | "desc" = "asc"
) {
  try {
    const response = await fetch(
      endPoints.creations.all(pageNumber, perPage, sortBy),
      {
        next: {
          tags: ["creations_list"],
          revalidate: 10,
        },
        headers: jwt
          ? {
              Authorization: `Bearer ${jwt}`,
            }
          : {},
      }
    )
    const result: GetListResponse<CreationInList> = await response.json()
    return result
  } catch (error: unknown) {
    return {
      data: [],
      pages: 0,
    }
  }
}

export async function GetCreationById(jwt: string | undefined, id: string) {
  try {
    const response = await fetch(endPoints.creations.byId(id), {
      headers: jwt
        ? {
            Authorization: `Bearer ${jwt}`,
          }
        : {},
      next: {
        revalidate: 10,
      },
    })
    if (response.status === 404) {
      throw createNotFoundError()
    }
    if (!response.ok) {
      throw createFetchError(response.status)
    }
    const result: Creation = await response.json()
    return result
  } catch (error: unknown) {
    const customError = error as CustomResponse
    if (customError.status === 404) {
      notFound()
    }
    redirect("/error")
  }
}
