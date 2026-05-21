import axios from 'axios'
import { API_BASE_URL } from '@/config/constants'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const auth = localStorage.getItem('intellmeet-auth')
  if (auth) {
    const { state } = JSON.parse(auth)
    if (state?.token) {
      config.headers.Authorization = `Bearer ${state.token}`
    }
  }
  return config
})

export default axiosInstance