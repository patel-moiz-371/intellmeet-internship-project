import { Bell } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const Navbar = () => {
  const { user } = useAuthStore()

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-800 text-white px-4 py-2 rounded-lg w-72 outline-none"
      />

      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <span className="text-white font-medium">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Navbar