import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../utils/useApi";
import { api } from "../../utils/api";
import { formatDate, pad, toISODate } from "../../utils/format";

const DAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function BookSlot() {

  const navigate = useNavigate();

  const dates = useMemo(() => Array.from({ length: 4 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      iso: toISODate(d),
      label: i === 0 ? "TODAY" : i === 1 ? "TOMORROW" : DAY[d.getDay()],
      day: pad(d.getDate()),
      month: MON[d.getMonth()]
    };
  }), []);

  const [date, setDate] = useState(dates[0].iso);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [crop, setCrop] = useState("Wheat");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: centerData } = useApi("/centers");
  const center = centerData?.centers?.[0];
  const { data: slotData, reload: reloadSlots } = useApi(
    center ? `/centers/${center.id}/slots?date=${date}` : "/centers"
  );
  const slots = center ? slotData?.slots || [] : [];
  const chosen = slots.find((x) => x.slot === selectedSlot);

  const handleConfirm = async () => {
    setError("");
    if (!center) return setError("No procurement center available");
    if (!selectedSlot) return setError("Please select a time slot");
    if (!(Number(quantity) > 0)) return setError("Enter the estimated quantity");

    setSaving(true);
    try {
      await api("/bookings", {
        method: "POST",
        body: { centerId: center.id, date, slot: selectedSlot, crop, quantity: Number(quantity) }
      });
      navigate("/farmer/dashboard");
    } catch (err) {
      setError(err.message);
      reloadSlots();
    } finally {
      setSaving(false);
    }
  };

  return (

    <div>

      <div className="page-header">

        <div>

          <span className="page-label">
            PROCUREMENT
          </span>

          <h1>
            Book a Procurement Slot
          </h1>

          <p>
            Select a center, date and convenient time slot.
          </p>

        </div>

      </div>


      <div className="booking-page-grid">

        {/* FORM */}

        <div className="dashboard-card">

          <div className="form-section">

            <h4>
              1. Select Procurement Center
            </h4>

            <p>
              Choose the center where you want to sell your produce.
            </p>


            <div className="center-option selected">

              <div className="center-radio">
                <div></div>
              </div>

              <div className="center-details">

                <strong>
                  {center?.name || "Loading centers..."}
                </strong>

                <span>
                  <i className="bi bi-geo-alt"></i>
                  {center?.location || ""}
                </span>

                <small>
                  Open today
                </small>

              </div>

              <span className="capacity-badge">
                {center?.totalSlots ?? 0} slots
              </span>

            </div>


            <h4 className="mt-5">
              2. Select Date
            </h4>

            <p>
              Available procurement dates are shown below.
            </p>


            <div className="date-grid">

              {dates.map((d) => (

                <div
                  key={d.iso}
                  className={d.iso === date ? "date-option selected" : "date-option"}
                  onClick={() => { setDate(d.iso); setSelectedSlot(""); }}
                >

                  <small>
                    {d.label}
                  </small>

                  <strong>
                    {d.day}
                  </strong>

                  <span>
                    {d.month}
                  </span>

                </div>

              ))}

            </div>


            <h4 className="mt-5">
              3. Select Time Slot
            </h4>

            <p>
              Choose an available time slot.
            </p>


            <div className="slot-grid">

              {slots.map((s) => (

                <button
                  key={s.slot}
                  type="button"
                  disabled={s.spotsLeft === 0}
                  className={
                    selectedSlot === s.slot
                      ? "slot-option selected"
                      : "slot-option"
                  }
                  onClick={() => setSelectedSlot(s.slot)}
                >

                  <i className="bi bi-clock"></i>

                  {s.slot}

                  <small>
                    {s.spotsLeft === 0 ? "Full" : `${s.spotsLeft} spots left`}
                  </small>

                </button>

              ))}

            </div>


            <h4 className="mt-5">
              4. Produce Details
            </h4>


            <div className="row g-3">

              <div className="col-md-6">

                <label className="form-label">
                  Crop / Produce
                </label>

                <select className="form-select" value={crop} onChange={(e) => setCrop(e.target.value)}>

                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Maize</option>
                  <option>Barley</option>

                </select>

              </div>


              <div className="col-md-6">

                <label className="form-label">
                  Estimated Quantity
                </label>

                <div className="input-group">

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <span className="input-group-text">
                    Quintal
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* SUMMARY */}

        <div>

          <div className="dashboard-card booking-summary">

            <span className="section-small">
              BOOKING SUMMARY
            </span>

            <h4>
              Your selected slot
            </h4>


            <div className="summary-center">

              <div className="summary-icon">
                <i className="bi bi-building"></i>
              </div>

              <div>

                <strong>
                  {center?.name || "-"}
                </strong>

                <small>
                  {center?.location || ""}
                </small>

              </div>

            </div>


            <div className="summary-row">

              <span>Date</span>

              <strong>
                {formatDate(date, true)}
              </strong>

            </div>


            <div className="summary-row">

              <span>Time</span>

              <strong>
                {chosen ? `${chosen.slot} - ${chosen.endTime}` : "Select a slot"}
              </strong>

            </div>


            <div className="summary-row">

              <span>Produce</span>

              <strong>
                {crop}{quantity ? ` • ${quantity} Quintal` : ""}
              </strong>

            </div>


            <hr />


            <div className="info-alert">

              <i className="bi bi-info-circle"></i>

              <span>
                Your digital token will be generated
                after confirming this booking.
              </span>

            </div>


            {error && <div className="alert alert-danger py-2 mt-3 mb-0">{error}</div>}

            <button className="primary-btn w-100 mt-3" onClick={handleConfirm} disabled={saving}>

              {saving ? "Booking..." : "Confirm Booking"}

              <i className="bi bi-arrow-right"></i>

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default BookSlot;