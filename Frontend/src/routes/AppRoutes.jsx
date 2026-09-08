import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import FarmerLayout from "../layouts/FarmerLayout";

import Dashboard from "../pages/farmer/Dashboard";
import BookSlot from "../pages/farmer/BookSlot";
import MyBookings from "../pages/farmer/MyBookings";
import LiveQueue from "../pages/farmer/LiveQueue";
import ProcurementStatus from "../pages/farmer/ProcurementStatus";
import Profile from "../pages/farmer/Profile";

function AppRoutes() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* FARMER */}
      <Route path="/farmer" element={<FarmerLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="book-slot" element={<BookSlot />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="queue" element={<LiveQueue />} />
        <Route path="status" element={<ProcurementStatus />} />
        <Route path="profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;