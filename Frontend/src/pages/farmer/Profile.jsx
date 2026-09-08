import React from "react";

function Profile() {

  return (

    <div>

      <div className="page-header">

        <div>

          <span className="page-label">
            ACCOUNT
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your personal and farming information.
          </p>

        </div>

      </div>


      <div className="profile-page-grid">

        {/* PROFILE CARD */}

        <div className="dashboard-card profile-sidebar">

          <div className="large-avatar">
            R
          </div>

          <h3>
            Ramesh Kumar
          </h3>

          <p>
            Registered Farmer
          </p>

          <span className="verified-badge">

            <i className="bi bi-patch-check-fill"></i>

            Verified Farmer

          </span>


          <hr />


          <div className="profile-side-info">

            <div>

              <i className="bi bi-phone"></i>

              <span>
                +91 98765 43210
              </span>

            </div>


            <div>

              <i className="bi bi-geo-alt"></i>

              <span>
                Lucknow, Uttar Pradesh
              </span>

            </div>

          </div>

        </div>


        {/* FORM */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>

              <span className="section-small">
                PERSONAL INFORMATION
              </span>

              <h4>
                Farmer Details
              </h4>

            </div>

          </div>


          <div className="row g-4">

            <div className="col-md-6">

              <label className="form-label">
                Full Name
              </label>

              <input
                className="form-control"
                value="Ramesh Kumar"
                readOnly
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                Mobile Number
              </label>

              <input
                className="form-control"
                value="+91 98765 43210"
                readOnly
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                Village
              </label>

              <input
                className="form-control"
                value="Lakhanpur"
                readOnly
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                District
              </label>

              <input
                className="form-control"
                value="Lucknow"
                readOnly
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                State
              </label>

              <input
                className="form-control"
                value="Uttar Pradesh"
                readOnly
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                Primary Crop
              </label>

              <select className="form-select">

                <option>Wheat</option>
                <option>Rice</option>
                <option>Maize</option>

              </select>

            </div>


            <div className="col-12">

              <label className="form-label">
                Address
              </label>

              <textarea
                className="form-control"
                rows="3"
                defaultValue="Lakhanpur Village, Lucknow, Uttar Pradesh"
              ></textarea>

            </div>


            <div className="col-12">

              <button className="primary-btn">

                Save Changes

                <i className="bi bi-check-lg"></i>

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;