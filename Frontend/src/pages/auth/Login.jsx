import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, saveSession } from "../../utils/api";

function Login() {

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api("/auth/login", { method: "POST", body: { mobile, password } });
      saveSession(data.token, data.farmer);
      navigate("/farmer/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

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
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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


            {error && <div className="alert alert-danger py-2">{error}</div>}

            <button className="primary-btn w-100" disabled={loading}>

              {loading ? "Logging in..." : "Login"}

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