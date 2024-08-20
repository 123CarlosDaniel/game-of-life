"use server"

import { Creation } from "@/types/creations"
import { endPoints } from "./endpoints"
import { GetListResponse } from "@/types/GetList"

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
    const result: GetListResponse<Creation> = await response.json()
    return result
  } catch (error) {
    console.error(error)
    return {
      data: [],
      pages: 0,
    }
  }
}
