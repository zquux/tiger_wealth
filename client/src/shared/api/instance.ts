import axios, { AxiosError } from 'axios'
import { createBrowserHistory } from 'history'

import { env } from '../config'
import {
  getApiAccessToken,
  getRefreshedTokens,
  logUserOut,
  setTokens
} from './apiMemoryStorage'

const history = createBrowserHistory()

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
  const accessToken = getApiAccessToken()

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  r => r,
  async error => {
    const originalRequest = error.config

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      !error.config.skipAuthRefresh
    ) {
      originalRequest._retry = true

      try {
        const tokens = await getRefreshedTokens()

        setTokens(tokens)

        return axiosInstance(originalRequest)
      } catch (e) {
        if (
          e instanceof AxiosError &&
          e.response?.data?.message === 'ERR_JWT_EXPIRED'
        ) {
          logUserOut()

          history.push('/signin')
          return
        }

        throw e
      }
    }

    throw error
  }
)
