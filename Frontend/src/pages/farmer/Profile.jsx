import React, { useEffect, useState } from "react";
import { api, getFarmer, saveFarmer } from "../../utils/api";

function Profile() {

  const [farmer, setFarmer] = useState(getFarmer());
  const [form, setForm] = useState({
    name: farmer?.name || "",
    village: farmer?.village || "",
    district: farmer?.district || "",
    state: farmer?.state || "",
    primaryCrop: farmer?.primaryCrop || "Wheat",
    address: farmer?.address || ""
  });
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/auth/me")
      .then(({ farmer: f }) => {
        setFarmer(f);
        saveFarmer(f);
        setForm({
          name: f.name, village: f.village, district: f.district,
          state: f.state, primaryCrop: f.primaryCrop, address: f.address
        });
      })
      .catch((err) => setMessage({ type: "danger", text: err.message }));
  }, []);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { farmer: f } = await api("/auth/me", { method: "PUT", body: form });
      setFarmer(f);
      saveFarmer(f);
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (err) {
      setMessage({ type: "danger", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const displayName = farmer?.name || "Farmer";
  const phone = farmer ? `+91 ${farmer.mobile.slice(0, 5)} ${farmer.mobile.slice(5)}` : "";

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
            {displayName.charAt(0).toUpperCase()}
          </div>

          <h3>
            {displayName}
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
                {phone}
              </span>

            </div>


            <div>

              <i className="bi bi-geo-alt"></i>

              <span>
                {farmer ? `${farmer.district}, ${farmer.state}` : ""}
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
                value={form.name}
                onChange={update("name")}
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                Mobile Number
              </label>

              <input
                className="form-control"
                value={phone}
                readOnly
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                Village
              </label>

              <input
                className="form-control"
                value={form.village}
                onChange={update("village")}
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                District
              </label>

              <input
                className="form-control"
                value={form.district}
                onChange={update("district")}
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                State
              </label>

              <input
                className="form-control"
                value={form.state}
                onChange={update("state")}
              />

            </div>


            <div className="col-md-6">

              <label className="form-label">
                Primary Crop
              </label>

              <select className="form-select" value={form.primaryCrop} onChange={update("primaryCrop")}>

                <option>Wheat</option>
                <option>Rice</option>
                <option>Maize</option>
                <option>Barley</option>

              </select>

            </div>


            <div className="col-12">

              <label className="form-label">
                Address
              </label>

              <textarea
                className="form-control"
                rows="3"
                value={form.address}
                onChange={update("address")}
              ></textarea>

            </div>


            <div className="col-12">

              {message && (
                <div className={`alert alert-${message.type} py-2`}>{message.text}</div>
              )}

              <button className="primary-btn" onClick={handleSave} disabled={saving}>

                {saving ? "Saving..." : "Save Changes"}

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