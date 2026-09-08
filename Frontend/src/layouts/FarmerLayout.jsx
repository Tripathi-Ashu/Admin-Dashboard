import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function FarmerLayout() {
  return (
    <div className="app-wrapper">

      <Sidebar />

      <div className="main-wrapper">

        <Navbar />

        <main className="main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default FarmerLayout;