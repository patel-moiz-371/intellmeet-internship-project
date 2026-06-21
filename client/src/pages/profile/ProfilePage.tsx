import { useAuthStore } from '@/store/authStore'

const ProfilePage = () => {
  const { user } = useAuthStore()

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Profile</h1>
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 max-w-lg">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
            <p className="text-gray-400">{user?.email}</p>
            <span className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full mt-2 inline-block capitalize">
              {user?.role}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Full Name</label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 mt-1 outline-none border border-gray-700"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              disabled
              className="w-full bg-gray-800 text-gray-500 rounded-lg px-4 py-3 mt-1 outline-none border border-gray-700 cursor-not-allowed"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-2">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage