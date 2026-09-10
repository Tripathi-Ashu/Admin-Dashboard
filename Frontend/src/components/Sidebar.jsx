import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/Sidebar.css'
function Sidebar({ isOpen }) {

  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: "bi-grid-1x2-fill", path: "/farmer/dashboard" },
    { name: "Book Procurement", icon: "bi-calendar-plus", path: "/farmer/book-slot" },
    { name: "My Bookings", icon: "bi-calendar-check", path: "/farmer/bookings" },
    { name: "Live Queue", icon: "bi-people-fill", path: "/farmer/queue" },
    { name: "Procurement Status", icon: "bi-box-seam", path: "/farmer/status" },
    { name: "My Profile", icon: "bi-person", path: "/farmer/profile" }
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>

      <div className="sidebar-menu">

        <p className="menu-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.name}</span>
          </NavLink>
        ))}

      </div>

      <div className="sidebar-bottom">

        <div className="help-box">
          <div className="help-icon"><i className="bi bi-headset"></i></div>
          <div>
            <strong>Need Help?</strong>
            <small>Contact support</small>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;