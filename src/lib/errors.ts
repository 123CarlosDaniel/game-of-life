import { CustomResponse } from "@/types/custom-response";

export function createNotFoundError(): CustomResponse {
  return {
    status: 404,
    error: true,
  }
}

export function createUnauthorizedError(): CustomResponse {
  return {
    status: 401,
    error: true,
  }
}

export function createFetchError(status: number): CustomResponse {
  return {
    status,
    error: true,
  };
}