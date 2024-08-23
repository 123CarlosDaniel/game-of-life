import { CustomResponse } from "@/types/custom-response";

export function createNotFoundError(message: string = "Not found"): CustomResponse {
  return {
    message,
    status: 404,
    error: true,
  }
}

export function createUnauthorizedError(message: string = "Unauthorized"): CustomResponse {
  return {
    message,
    status: 401,
    error: true,
  }
}

export function createFetchError(status: number, message: string = "Fetch error"): CustomResponse {
  return {
    message,
    status,
    error: true,
  };
}