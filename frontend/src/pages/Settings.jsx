import MainLayout from "../layouts/MainLayout";

const Settings = () => {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold text-white mb-6">
        Settings
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Profile Settings */}
        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Profile Settings
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block text-gray-400 mb-2">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Jay Gaikwad"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Email
              </label>

              <input
                type="email"
                defaultValue="jay@example.com"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl outline-none"
              />
            </div>

            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl transition">
              Save Changes
            </button>

          </div>

        </div>

        {/* Preferences */}
        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Preferences
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center">

              <span className="text-gray-300">
                Email Notifications
              </span>

              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between items-center">

              <span className="text-gray-300">
                Dark Mode
              </span>

              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between items-center">

              <span className="text-gray-300">
                Meeting Reminders
              </span>

              <input type="checkbox" defaultChecked />
            </div>

          </div>

        </div>

      </div>

      {/* Security */}
      <div className="bg-slate-800 rounded-2xl p-6 mt-6">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Security
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-gray-400 mb-2">
              Current Password
            </label>

            <input
              type="password"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              New Password
            </label>

            <input
              type="password"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl outline-none"
            />
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition">
            Update Password
          </button>

        </div>

      </div>

    </MainLayout>
  );
};

export default Settings;