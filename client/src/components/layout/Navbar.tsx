import { useState } from 'react'
import { Bell, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const Navbar = () => {
  const { user } = useAuthStore()

  const [search, setSearch] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-gray-800 text-white px-4 py-2 rounded-lg w-72 outline-none border border-gray-700 focus:border-blue-500"
      />

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-300 hover:text-white relative"
          >
            <Bell size={20} />

            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-semibold">
                  Notifications
                </h3>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-sm text-gray-300">
                  📅 Meeting scheduled at 4:00 PM
                </div>

                <div className="text-sm text-gray-300">
                  ✅ New task assigned to you
                </div>

                <div className="text-sm text-gray-300">
                  👤 Profile updated successfully
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            <span className="text-white font-medium">
              {user?.name || 'User'}
            </span>

            <ChevronDown
              size={16}
              className="text-gray-400"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-700 text-white transition">
                Profile
              </button>

              <button className="w-full text-left px-4 py-3 hover:bg-gray-700 text-white transition">
                Settings
              </button>

              <button className="w-full text-left px-4 py-3 hover:bg-gray-700 text-red-400 transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar