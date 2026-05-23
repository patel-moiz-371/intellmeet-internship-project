import {
  Bell,
  Search,
  User,
  Menu,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import { useState } from "react";

import { useTheme } from "../context/ThemeContext";

const Navbar = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const { darkMode, setDarkMode } =
    useTheme();

  return (
    <div className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4 md:px-6 relative">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="md:hidden text-white"
        >
          <Menu size={26} />
        </button>

        <h1 className="text-2xl font-bold text-white">
          IntellMeet
        </h1>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">

        {/* Search */}
        <div className="hidden md:flex bg-slate-800 px-3 py-2 rounded-lg items-center gap-2">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white"
          />

        </div>

        {/* Theme Toggle */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="text-white"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">

          <button
            onClick={() =>
              setNotificationOpen(!notificationOpen)
            }
            className="relative"
          >
            <Bell
              className="text-white cursor-pointer"
            />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </button>

          {/* Notification Dropdown */}
          {notificationOpen && (
            <div className="absolute right-0 mt-4 w-72 bg-slate-800 rounded-2xl shadow-xl p-4 z-50">

              <h3 className="text-white font-semibold mb-4">
                Notifications
              </h3>

              <div className="space-y-3">

                <div className="bg-slate-700 p-3 rounded-xl text-sm text-gray-200">
                  New meeting scheduled at 4 PM
                </div>

                <div className="bg-slate-700 p-3 rounded-xl text-sm text-gray-200">
                  AI summary generated successfully
                </div>

                <div className="bg-slate-700 p-3 rounded-xl text-sm text-gray-200">
                  Rohit joined your workspace
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
            className="flex items-center gap-2"
          >

            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center">

              <User
                className="text-white"
                size={18}
              />

            </div>

            <ChevronDown
              className="text-white"
              size={18}
            />

          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-4 w-56 bg-slate-800 rounded-2xl shadow-xl p-4 z-50">

              <div className="border-b border-slate-700 pb-3 mb-3">

                <h3 className="text-white font-semibold">
                  Jay Gaikwad
                </h3>

                <p className="text-gray-400 text-sm">
                  Frontend Developer
                </p>

              </div>

              <div className="space-y-3">

                <button className="w-full text-left text-gray-300 hover:text-white transition">
                  Profile
                </button>

                <button className="w-full text-left text-gray-300 hover:text-white transition">
                  Settings
                </button>

                <button className="w-full text-left text-red-400 hover:text-red-300 transition">
                  Logout
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Navbar;