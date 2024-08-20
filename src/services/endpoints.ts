const API_URL = process.env.API_URL

export const endPoints = {
  creations: {
    all: (pageNumber: number, perPage: number, sortBy: string) => {
      return `${API_URL}/creation/all?page-number=${pageNumber}&per-page=${perPage}&sort-by=${sortBy}`
    },
  },
}
