const API_URL = process.env.API_URL

export const endPoints = {
  creations: {
    all: (page: number, perPage: number, sortBy: string) => {
      return `${API_URL}/creation/all?page=${page}&per_page=${perPage}&sort_by=${sortBy}`
    },
    byId: (id: string) => {
      return `${API_URL}/creation/${id}`
    },
    saveData: (id: string) => {
      return `${API_URL}/creation/${id}/save_data`
    },
    getData: (id: string) => {
      return `${API_URL}/creation/${id}/get_data`
    },
    post: () => {
      return `${API_URL}/creation`
    }
  },
  comments: {
    create: (creationId: string) => {
      return `${API_URL}/comment?creation_id=${creationId}`
    }
  },
  reactions: {
    create: (creationId: string) => {
      return `${API_URL}/reaction?creation_id=${creationId}`
    },
    delete: (creationId: string) => {
      return `${API_URL}/reaction?creation_id=${creationId}`
    }
  }
}
