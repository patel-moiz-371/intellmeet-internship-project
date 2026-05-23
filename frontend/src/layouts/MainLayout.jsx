import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 min-h-screen bg-slate-950 md:ml-0">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;