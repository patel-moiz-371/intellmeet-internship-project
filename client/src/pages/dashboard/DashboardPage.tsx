import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mb-2">Email: {user?.email}</p>
        <p className="text-gray-400 mb-8">Role: {user?.role}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default DashboardPage