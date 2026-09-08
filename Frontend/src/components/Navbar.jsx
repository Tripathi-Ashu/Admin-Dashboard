import React from "react";
import '../styles/Header.css'

function Navbar({ onMenuClick }) {
  return (
    <header className="top-navbar">

      <div className="navbar-left">

        <button className="menu-toggle-btn" onClick={onMenuClick}>
          <i className="bi bi-list"></i>
        </button>

        <div className="navbar-brand">

          <div className="logo-icon">
            <i className="bi bi-flower1"></i>
          </div>

          <div>
            <h6>Smart Mandi</h6>
            <small>Farmer Portal</small>
          </div>

        </div>

      </div>


      <div className="navbar-right">

        <button className="notification-btn">
          <i className="bi bi-bell"></i>
          <span></span>
        </button>

        <div className="profile-mini">

          <div className="profile-avatar">R</div>

          <div>
            <strong>Ramesh Kumar</strong>
            <small>Farmer</small>
          </div>

          <i className="bi bi-chevron-down"></i>

        </div>

      </div>

    </header>
  );
}

export default Navbar;