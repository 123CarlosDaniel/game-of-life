"use server"

import { Creation, CreationInList } from "@/types/creations"
import { endPoints } from "./endpoints"
import { GetListResponse } from "@/types/GetList"
import { createFetchError, createNotFoundError, createUnauthorizedError } from "@/lib/errors"
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
          revalidate: 300,
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
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
      next: {
        revalidate: 300,
        tags: [`creations_by_id_${id}`],
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

export async function SaveCreationData(
  jwt: string | undefined,
  id: string,
  data: string
) {
  try {
    const response = await fetch(endPoints.creations.saveData(id), {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data}),
      method: "POST",
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
