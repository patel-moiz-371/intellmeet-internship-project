import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const token = searchParams.get('token')
    const name = searchParams.get('name')
    const email = searchParams.get('email')
    const role = searchParams.get('role')
    const id = searchParams.get('id')

    if (token && name && email && role && id) {
      setAuth(
        {
          _id: id,
          name: decodeURIComponent(name),
          email: decodeURIComponent(email),
          role: role as any,
          createdAt: new Date().toISOString(),
        },
        token
      )
      navigate('/dashboard')
    } else {
      navigate('/login?error=google_failed')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Signing you in with Google...</p>
      </div>
    </div>
  )
}

export default AuthCallbackPage