import {
  LayoutDashboard,
  Video,
  Users,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  const menu = [
    {
      icon: <LayoutDashboard />,
      name: "Dashboard",
      path: "/",
    },
    {
      icon: <Video />,
      name: "Meetings",
      path: "/meetings",
    },
    {
      icon: <Users />,
      name: "Teams",
      path: "/teams",
    },
    {
      icon: <BarChart3 />,
      name: "Analytics",
      path: "/analytics",
    },
    {
      icon: <Settings />,
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-700 p-5 transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button Mobile */}
        <div className="flex justify-end md:hidden mb-5">
          <button onClick={toggleSidebar}>
            <X className="text-white" />
          </button>
        </div>

        <div className="space-y-4 mt-4">
          {menu.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleSidebar();
                }
              }}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;