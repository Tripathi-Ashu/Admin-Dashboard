import React from "react";

function Navbar() {
  return (
    <header className="top-navbar">

      <div>

        <h6 className="mb-0">
          Farmer Portal
        </h6>

        <small>
          Manage your procurement easily
        </small>

      </div>


      <div className="navbar-right">

        <button className="notification-btn">

          <i className="bi bi-bell"></i>

          <span></span>

        </button>


        <div className="profile-mini">

          <div className="profile-avatar">
            R
          </div>

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