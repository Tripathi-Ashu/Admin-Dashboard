import React from "react";
import { Link } from "react-router-dom";

import StatCard from "../../components/StatCard";

function Dashboard() {

  return (

    <div>

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <span className="page-label">
            FARMER DASHBOARD
          </span>

          <h1>
            Good Morning, Ramesh 👋
          </h1>

          <p>
            Here's what's happening with your procurement today.
          </p>

        </div>

        <Link
          to="/farmer/book-slot"
          className="primary-btn"
        >

          <i className="bi bi-plus-lg"></i>

          Book New Slot

        </Link>

      </div>


      {/* STATS */}

      <div className="stats-grid">

        <StatCard
          title="Active Token"
          value="A-105"
          icon="bi-ticket-perforated"
          description="Today, 10:00 AM"
          type="green"
        />

        <StatCard
          title="Queue Position"
          value="#04"
          icon="bi-people"
          description="3 farmers ahead"
          type="blue"
        />

        <StatCard
          title="Estimated Wait"
          value="24 min"
          icon="bi-clock"
          description="Updated just now"
          type="orange"
        />

        <StatCard
          title="Completed"
          value="12"
          icon="bi-check-circle"
          description="Procurements this year"
          type="purple"
        />

      </div>


      {/* MAIN GRID */}

      <div className="dashboard-grid">

        {/* ACTIVE BOOKING */}

        <div className="dashboard-card active-booking">

          <div className="card-header">

            <div>

              <span className="section-small">
                ACTIVE PROCUREMENT
              </span>

              <h4>
                Today's Booking
              </h4>

            </div>

            <span className="status-badge waiting">
              <span></span>
              Waiting
            </span>

          </div>


          <div className="booking-info-grid">

            <div>

              <small>PROCUREMENT CENTER</small>

              <strong>
                Lucknow Mandi Center
              </strong>

            </div>

            <div>

              <small>DATE</small>

              <strong>
                10 September 2026
              </strong>

            </div>

            <div>

              <small>TIME SLOT</small>

              <strong>
                10:00 AM - 11:00 AM
              </strong>

            </div>

            <div>

              <small>TOKEN NUMBER</small>

              <strong className="token-number">
                A-105
              </strong>

            </div>

          </div>


          <div className="queue-progress">

            <div className="queue-progress-top">

              <span>
                Current queue progress
              </span>

              <strong>
                16 / 20
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{ width: "80%" }}
              ></div>

            </div>

          </div>


          <Link
            to="/farmer/queue"
            className="secondary-btn"
          >

            View Live Queue

            <i className="bi bi-arrow-right"></i>

          </Link>

        </div>


        {/* QUICK ACTIONS */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>

              <span className="section-small">
                QUICK ACTIONS
              </span>

              <h4>
                What do you want to do?
              </h4>

            </div>

          </div>


          <div className="quick-actions">

            <Link
              to="/farmer/book-slot"
              className="quick-action"
            >

              <div className="quick-icon green-bg">
                <i className="bi bi-calendar-plus"></i>
              </div>

              <div>

                <strong>
                  Book Procurement
                </strong>

                <small>
                  Find available slots
                </small>

              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>


            <Link
              to="/farmer/bookings"
              className="quick-action"
            >

              <div className="quick-icon blue-bg">
                <i className="bi bi-calendar-check"></i>
              </div>

              <div>

                <strong>
                  My Bookings
                </strong>

                <small>
                  View booking history
                </small>

              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>


            <Link
              to="/farmer/status"
              className="quick-action"
            >

              <div className="quick-icon orange-bg">
                <i className="bi bi-box-seam"></i>
              </div>

              <div>

                <strong>
                  Procurement Status
                </strong>

                <small>
                  Track your produce
                </small>

              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>

          </div>

        </div>

      </div>


      {/* RECENT ACTIVITY */}

      <div className="dashboard-card recent-card">

        <div className="card-header">

          <div>

            <span className="section-small">
              RECENT ACTIVITY
            </span>

            <h4>
              Procurement History
            </h4>

          </div>

          <Link to="/farmer/bookings">
            View All
          </Link>

        </div>


        <div className="table-responsive">

          <table className="table custom-table">

            <thead>

              <tr>

                <th>DATE</th>
                <th>CENTER</th>
                <th>CROP</th>
                <th>WEIGHT</th>
                <th>STATUS</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>02 Sep 2026</td>

                <td>Lucknow Mandi</td>

                <td>Wheat</td>

                <td>42.5 Quintal</td>

                <td>
                  <span className="table-status completed">
                    Completed
                  </span>
                </td>

              </tr>


              <tr>

                <td>28 Aug 2026</td>

                <td>Lucknow Mandi</td>

                <td>Rice</td>

                <td>30 Quintal</td>

                <td>
                  <span className="table-status completed">
                    Completed
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;