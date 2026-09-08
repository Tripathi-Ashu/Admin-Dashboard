import React from "react";

function MyBookings() {

  return (

    <div>

      <div className="page-header">

        <div>

          <span className="page-label">
            BOOKINGS
          </span>

          <h1>
            My Procurement Bookings
          </h1>

          <p>
            View and manage all your procurement appointments.
          </p>

        </div>

      </div>


      <div className="dashboard-card">

        <div className="filter-row">

          <div className="search-box">

            <i className="bi bi-search"></i>

            <input
              placeholder="Search bookings..."
            />

          </div>


          <select className="form-select filter-select">

            <option>All Status</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>

          </select>

        </div>


        <div className="table-responsive">

          <table className="table custom-table">

            <thead>

              <tr>

                <th>TOKEN</th>
                <th>DATE</th>
                <th>CENTER</th>
                <th>SLOT</th>
                <th>CROP</th>
                <th>STATUS</th>
                <th></th>

              </tr>

            </thead>


            <tbody>

              <tr>

                <td>
                  <strong className="token-text">
                    A-105
                  </strong>
                </td>

                <td>
                  08 Sep 2026
                </td>

                <td>
                  Lucknow Mandi
                </td>

                <td>
                  10:00 AM
                </td>

                <td>
                  Wheat
                </td>

                <td>
                  <span className="table-status waiting">
                    Upcoming
                  </span>
                </td>

                <td>
                  <button className="icon-btn">
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>

              </tr>


              <tr>

                <td>
                  <strong className="token-text">
                    A-089
                  </strong>
                </td>

                <td>
                  02 Sep 2026
                </td>

                <td>
                  Lucknow Mandi
                </td>

                <td>
                  09:00 AM
                </td>

                <td>
                  Wheat
                </td>

                <td>
                  <span className="table-status completed">
                    Completed
                  </span>
                </td>

                <td>
                  <button className="icon-btn">
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>

              </tr>


              <tr>

                <td>
                  <strong className="token-text">
                    A-071
                  </strong>
                </td>

                <td>
                  28 Aug 2026
                </td>

                <td>
                  Lucknow Mandi
                </td>

                <td>
                  11:00 AM
                </td>

                <td>
                  Rice
                </td>

                <td>
                  <span className="table-status completed">
                    Completed
                  </span>
                </td>

                <td>
                  <button className="icon-btn">
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>

              </tr>


              <tr>

                <td>
                  <strong className="token-text">
                    A-052
                  </strong>
                </td>

                <td>
                  21 Aug 2026
                </td>

                <td>
                  Lucknow Mandi
                </td>

                <td>
                  02:00 PM
                </td>

                <td>
                  Rice
                </td>

                <td>
                  <span className="table-status cancelled">
                    Cancelled
                  </span>
                </td>

                <td>
                  <button className="icon-btn">
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default MyBookings;