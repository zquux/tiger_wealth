import { axiosInstance } from '@/shared/api'

export const cryptoBoardService = {
  async getCryptoFromContentful() {
    const res = await axiosInstance.get('http://localhost:3001/api/board')

    return res.data
  }
}
