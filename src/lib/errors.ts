export function createNotFoundError(message: string): CustomError {
  return {
    name: "NotFoundError",
    message: message,
  }
}

export function createUnauthorizedError(message: string): CustomError {
  return {
    name: "UnauthorizedError",
    message: message,
  }
}

export function createFetchError(message: string, status: number): CustomError {
  return {
    name: "FetchError",
    message,
    status,
  };
}