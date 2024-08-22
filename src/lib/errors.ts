import { CustomResponse } from "@/types/custom-error";

export function createNotFoundError(): CustomResponse {
  return {
    status: 404,
  }
}

export function createUnauthorizedError(): CustomResponse {
  return {
    status: 401,
  }
}

export function createFetchError(status: number): CustomResponse {
  return {
    status,
  };
}