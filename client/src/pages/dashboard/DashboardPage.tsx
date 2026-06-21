import { useAuthStore } from '@/store/authStore'
import { Video, Users, CheckSquare, Clock } from 'lucide-react'

const DashboardPage = () => {
  const { user } = useAuthStore()

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mt-1">Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Total Meetings</p>
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <Video size={18} className="text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">0</p>
          <p className="text-gray-400 text-xs mt-1">No meetings yet</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Team Members</p>
            <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
              <Users size={18} className="text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">0</p>
          <p className="text-gray-400 text-xs mt-1">No members yet</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Pending Tasks</p>
            <div className="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center">
              <CheckSquare size={18} className="text-yellow-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">0</p>
          <p className="text-gray-400 text-xs mt-1">No tasks yet</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">Meeting Hours</p>
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
              <Clock size={18} className="text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">0h</p>
          <p className="text-gray-400 text-xs mt-1">This month</p>
        </div>
      </div>

      {/* Recent Meetings */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Meetings</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Video size={40} className="text-gray-600 mb-3" />
          <p className="text-gray-400">No meetings yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Start a meeting to see it here
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage