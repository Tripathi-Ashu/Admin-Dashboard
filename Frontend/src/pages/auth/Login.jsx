import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const handleLogin = (e) => {

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
            <i className="bi bi-shield-check"></i>
            Digital Procurement Platform
          </span>

          <h1>
            Smart procurement for
            <span> every farmer.</span>
          </h1>

          <p>
            Book your procurement slot, track your queue
            and stay updated with your procurement status.
          </p>


          <div className="auth-features">

            <div>
              <i className="bi bi-calendar-check"></i>
              <span>Easy slot booking</span>
            </div>

            <div>
              <i className="bi bi-clock-history"></i>
              <span>Real-time queue tracking</span>
            </div>

            <div>
              <i className="bi bi-bell"></i>
              <span>Procurement notifications</span>
            </div>

          </div>

        </div>

      </div>


      <div className="auth-right">

        <div className="auth-card">

          <div className="mobile-logo">

            <div className="logo-icon">
              <i className="bi bi-flower1"></i>
            </div>

            <strong>Smart Mandi</strong>

          </div>


          <div className="auth-heading">

            <h2>Welcome back</h2>

            <p>
              Login to manage your procurement
            </p>

          </div>


          <form onSubmit={handleLogin}>

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

              <label>Password</label>

              <div className="input-icon">

                <i className="bi bi-lock"></i>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />

              </div>

            </div>


            <div className="form-options">

              <label className="remember">

                <input type="checkbox" />

                Remember me

              </label>

              <a href="#">
                Forgot password?
              </a>

            </div>


            <button className="primary-btn w-100">

              Login

              <i className="bi bi-arrow-right"></i>

            </button>

          </form>


          <div className="auth-divider">
            <span>OR</span>
          </div>


          <p className="register-text">

            Don't have an account?

            <Link to="/register">
              Register as Farmer
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;