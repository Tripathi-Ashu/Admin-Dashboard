import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import useApi from '../../utils/useApi';
import { getFarmer } from '../../utils/api';
import { formatDate, padNum, STATUS_TEXT, statusClass } from '../../utils/format';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
}

function Dashboard() {
  const { data: active, error } = useApi('/bookings/active', { poll: 10000 });
  const { data: stats } = useApi('/bookings/stats');

  const booking = active?.booking;
  const queue = active?.queue;
  const mine = queue?.mine;
  const firstName = (getFarmer()?.name || 'Farmer').split(' ')[0];

  const total = queue?.list?.length || 0;
  const done = queue?.list?.filter((r) => r.status === 'completed').length || 0;
  const progress = total ? Math.round((done / total) * 100) : 0;

  // Values used in the duplicate card
  const duplicateHeaderTitle = booking ? `${booking.crop} Procurement` : 'No active procurement';
  const duplicateCenterName = booking?.center.name || '-';
  const bookingDate = booking ? formatDate(booking.date, true) : '-';
  const bookingSlot = booking ? `${booking.slot} - ${booking.endTime}` : '-';
  const bookingToken = booking?.token || '-';

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <span className="page-label">FARMER DASHBOARD</span>

          <h1>{greeting()}, {firstName} 👋</h1>

          <p>
            Here's what's happening with your procurement today.
          </p>
        </div>

        <Link to="/farmer/book-slot" className="primary-btn">
          <i className="bi bi-plus-lg"></i> Book New Slot
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* STATS */}
      <div className="stats-grid">
        <StatCard
          title="Active Token"
          value={bookingToken}
          icon="bi-ticket-perforated"
          description={booking ? `${formatDate(booking.date)}, ${booking.slot}` : 'No active booking'}
          type="green"
        />

        <StatCard
          title="Queue Position"
          value={mine?.position ? `#${padNum(mine.position)}` : '—'}
          icon="bi-people"
          description={mine?.ahead != null ? `${mine.ahead} farmers ahead` : 'Check in to join the queue'}
          type="blue"
        />

        <StatCard
          title="Estimated Wait"
          value={mine?.estimatedWaitMinutes != null ? `${mine.estimatedWaitMinutes} min` : '—'}
          icon="bi-clock"
          description={queue ? 'Updated just now' : 'No active queue'}
          type="orange"
        />

        <StatCard
          title="Completed"
          value={String(stats?.completedThisYear ?? 0)}
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

              <h4>{duplicateHeaderTitle}</h4>
            </div>

            <span className={`status-badge ${booking ? statusClass(booking.status) : 'waiting'}`}>
              <span></span> {booking ? STATUS_TEXT[booking.status] : 'None'}
            </span>
          </div>

          <div className="booking-info-grid">
            <div>
              <small>PROCUREMENT CENTER</small>
              <strong>{duplicateCenterName}</strong>
            </div>

            <div>
              <small>DATE</small>
              <strong>{bookingDate}</strong>
            </div>

            <div>
              <small>TIME SLOT</small>
              <strong>{bookingSlot}</strong>
            </div>

            <div>
              <small>TOKEN NUMBER</small>
              <strong className="token-number">{bookingToken}</strong>
            </div>
          </div>

          <div className="queue-progress">
            <div className="queue-progress-top">
              <span>Current queue progress</span>
              <strong>{done} / {total}</strong>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <Link to="/farmer/queue" className="secondary-btn">
            View Live Queue
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        {/* DUPLICATE COPIED CARD - FOR SONARQUBE TEST */}
        <div className="dashboard-card active-booking duplicate-test-card">
          <div className="card-header">
            <div>
              <span className="section-small">
                ACTIVE PROCUREMENT
              </span>

              <h4>{duplicateHeaderTitle}</h4>
            </div>

            <span className={`status-badge ${booking ? statusClass(booking.status) : 'waiting'}`}>
              <span></span> {booking ? STATUS_TEXT[booking.status] : 'None'}
            </span>
          </div>

          <div className="booking-info-grid">
            <div>
              <small>PROCUREMENT CENTER</small>
              <strong>{duplicateCenterName}</strong>
            </div>

            <div>
              <small>DATE</small>
              <strong>{bookingDate}</strong>
            </div>

            <div>
              <small>TIME SLOT</small>
              <strong>{bookingSlot}</strong>
            </div>

            <div>
              <small>TOKEN NUMBER</small>
              <strong className="token-number">{bookingToken}</strong>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <span className="section-small">
                QUICK ACTIONS
              </span>

              <h4>What do you want to do?</h4>
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
                <strong>Book Procurement</strong>
                <small>Find available slots</small>
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
                <strong>My Bookings</strong>
                <small>View booking history</small>
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
                <strong>Procurement Status</strong>
                <small>Track your produce</small>
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

            <h4>Procurement History</h4>
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
              {(stats?.recent || []).map((b) => (
                <tr key={b.id}>
                  <td>{formatDate(b.date)}</td>
                  <td>{b.center.name}</td>
                  <td>{b.crop}</td>
                  <td>{b.quantity} Quintal</td>

                  <td>
                    <span className={`table-status ${statusClass(b.status)}`}>
                      {STATUS_TEXT[b.status]}
                    </span>
                  </td>
                </tr>
              ))}

              {stats && stats.recent.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No completed procurements yet
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

export default Dashboard;