import z from 'zod'

import { axiosInstance } from '@/shared/api'

import { UserDtoSchema } from './contracts'
import { userApiEndpoints } from './endpoints'

export const userService = {
  async getCurrentUser() {
    const response = await axiosInstance.get(userApiEndpoints.me)

    const parsedData = z.parse(UserDtoSchema, response.data)

    return parsedData
  }
}
