import { LayoutDashboard, Calendar, CheckSquare, BarChart3, User, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const Sidebar = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Meetings', icon: Calendar, path: '/meetings' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Profile', icon: User, path: '/profile' },
  ]

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">IntellMeet</h1>
      </div>

      <nav className="flex-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar