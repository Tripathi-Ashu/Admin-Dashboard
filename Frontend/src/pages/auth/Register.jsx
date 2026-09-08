import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const handleRegister = (e) => {

    e.preventDefault();

    navigate("/farmer/dashboard");

  };

  return (

    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-brand">

          <div className="logo-icon">
            <i className="bi bi-flower1"></i>
          </div>

          <span>Smart Mandi</span>

        </div>


        <div className="auth-content">

          <span className="auth-badge">
            Farmer Registration
          </span>

          <h1>
            Join the
            <span> Smart Procurement</span>
            network.
          </h1>

          <p>
            Register once and easily manage your
            procurement slots and bookings.
          </p>

        </div>

      </div>


      <div className="auth-right">

        <div className="auth-card register-card">

          <div className="auth-heading">

            <h2>Create account</h2>

            <p>
              Register as a farmer
            </p>

          </div>


          <form onSubmit={handleRegister}>

            <div className="form-group">

              <label>Full Name</label>

              <div className="input-icon">

                <i className="bi bi-person"></i>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>Mobile Number</label>

              <div className="input-icon">

                <i className="bi bi-phone"></i>

                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter mobile number"
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>Village</label>

              <div className="input-icon">

                <i className="bi bi-geo-alt"></i>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter village"
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>Password</label>

              <div className="input-icon">

                <i className="bi bi-lock"></i>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Create password"
                  required
                />

              </div>

            </div>


            <button className="primary-btn w-100">

              Create Account

              <i className="bi bi-arrow-right"></i>

            </button>

          </form>


          <p className="register-text mt-4">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Register;