import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function FarmerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-wrapper">

      <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

      <Sidebar isOpen={sidebarOpen} />

      <div className={`main-wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
        <main className="main-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default FarmerLayout;