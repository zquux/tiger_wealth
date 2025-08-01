import axios from 'axios'

export const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
