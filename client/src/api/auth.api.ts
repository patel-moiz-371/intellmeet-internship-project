import axiosInstance from './axiosInstance'
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth.types'

export const registerAPI = async (data: RegisterCredentials): Promise<AuthResponse> => {
  const res = await axiosInstance.post('/auth/register', data)
  return res.data
}

export const loginAPI = async (data: LoginCredentials): Promise<AuthResponse> => {
  const res = await axiosInstance.post('/auth/login', data)
  return res.data
}

export const logoutAPI = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout')
}