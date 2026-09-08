import React, { useState } from "react";

function BookSlot() {

  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");

  const slots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"
  ];

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
                  Lucknow Mandi Procurement Center
                </strong>

                <span>
                  <i className="bi bi-geo-alt"></i>
                  Chinhat, Lucknow
                </span>

                <small>
                  2.4 km away • Open today
                </small>

              </div>

              <span className="capacity-badge">
                32 slots
              </span>

            </div>


            <h4 className="mt-5">
              2. Select Date
            </h4>

            <p>
              Available procurement dates are shown below.
            </p>


            <div className="date-grid">

              <div className="date-option">

                <small>
                  TODAY
                </small>

                <strong>
                  07
                </strong>

                <span>
                  SEP
                </span>

              </div>


              <div className="date-option selected">

                <small>
                  TOMORROW
                </small>

                <strong>
                  08
                </strong>

                <span>
                  SEP
                </span>

              </div>


              <div className="date-option">

                <small>
                  WED
                </small>

                <strong>
                  09
                </strong>

                <span>
                  SEP
                </span>

              </div>


              <div className="date-option">

                <small>
                  THU
                </small>

                <strong>
                  10
                </strong>

                <span>
                  SEP
                </span>

              </div>

            </div>


            <h4 className="mt-5">
              3. Select Time Slot
            </h4>

            <p>
              Choose an available time slot.
            </p>


            <div className="slot-grid">

              {slots.map((slot) => (

                <button
                  key={slot}
                  type="button"
                  className={
                    selectedSlot === slot
                      ? "slot-option selected"
                      : "slot-option"
                  }
                  onClick={() => setSelectedSlot(slot)}
                >

                  <i className="bi bi-clock"></i>

                  {slot}

                  <small>
                    12 spots left
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

                <select className="form-select">

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
                  Lucknow Mandi
                </strong>

                <small>
                  Chinhat, Lucknow
                </small>

              </div>

            </div>


            <div className="summary-row">

              <span>Date</span>

              <strong>
                08 September 2026
              </strong>

            </div>


            <div className="summary-row">

              <span>Time</span>

              <strong>
                {selectedSlot} - 11:00 AM
              </strong>

            </div>


            <div className="summary-row">

              <span>Produce</span>

              <strong>
                Wheat
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


            <button className="primary-btn w-100 mt-3">

              Confirm Booking

              <i className="bi bi-arrow-right"></i>

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default BookSlot;