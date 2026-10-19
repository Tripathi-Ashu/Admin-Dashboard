import React, { useEffect, useState } from "react";
import useApi from "../../utils/useApi";
import { api } from "../../utils/api";
import { formatDate, STATUS_TEXT, statusClass, CANCELLABLE } from "../../utils/format";

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function MyBookings() {

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [actionError, setActionError] = useState("");

  // debounce the search box
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const params = new URLSearchParams();
  if (filter) params.set("status", filter);
  if (query) params.set("q", query);
  const { data, error, loading, reload } = useApi(`/bookings?${params.toString()}`);
  const bookings = data?.bookings || [];

  const act = async (id, action) => {
    setActionError("");
    try {
      await api(`/bookings/${id}/${action}`, { method: "POST" });
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  };

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <select
            className="form-select filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >

            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>

          </select>

        </div>


        {(error || actionError) && (
          <div className="alert alert-danger">{error || actionError}</div>
        )}

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

              {bookings.map((b) => (

                <tr key={b.id}>

                  <td>
                    <strong className="token-text">
                      {b.token}
                    </strong>
                  </td>

                  <td>{formatDate(b.date)}</td>

                  <td>{b.center.name}</td>

                  <td>{b.slot}</td>

                  <td>{b.crop}</td>

                  <td>
                    <span className={`table-status ${statusClass(b.status)}`}>
                      {STATUS_TEXT[b.status]}
                    </span>
                  </td>

                  <td>
                    {b.status === "booked" && b.date === todayISO() && (
                      <button
                        className="icon-btn"
                        title="Check in"
                        onClick={() => act(b.id, "check-in")}
                      >
                        <i className="bi bi-box-arrow-in-right"></i>
                      </button>
                    )}

                    {CANCELLABLE.includes(b.status) && (
                      <button
                        className="icon-btn"
                        title="Cancel booking"
                        onClick={() => window.confirm("Cancel this booking?") && act(b.id, "cancel")}
                      >
                        <i className="bi bi-x-circle"></i>
                      </button>
                    )}
                  </td>

                </tr>

              ))}

              {!loading && bookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No bookings found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default MyBookings;