import React from "react";
import useApi from "../../utils/useApi";
import { formatDate, formatDateTime, STATUS_TEXT, statusClass } from "../../utils/format";

const STEPS = [
  { title: "Slot Booked", icon: "bi-calendar-check" },
  { title: "Checked In", icon: "bi-person-check" },
  { title: "Waiting in Queue", icon: "bi-people" },
  { title: "Weighing", icon: "bi-speedometer2" },
  { title: "Quality Check", icon: "bi-clipboard-check" },
  { title: "Procurement Completed", icon: "bi-check-circle" }
];

// index of the step the booking is currently on
const CURRENT = { booked: 0, checked_in: 2, waiting: 2, weighing: 3, quality_check: 4, completed: 5 };

function ProcurementStatus() {

  const { data, error, loading } = useApi("/bookings/active", { poll: 5000 });
  const booking = data?.booking;
  const current = booking ? CURRENT[booking.status] : -1;

  const stepDate = (index) => {
    if (index === 0) return formatDateTime(booking.createdAt) || "Done";
    if (index === 1 && booking.checkedInAt) return formatDateTime(booking.checkedInAt);
    if (index === current) return `Current Status${booking.updatedAt ? " • " + (formatDateTime(booking.updatedAt) || "") : ""}`;
    return index < current ? "Done" : "Pending";
  };

  const steps = booking
    ? STEPS.map((step, index) => ({
        ...step,
        date: stepDate(index),
        done: index <= current,
        active: index === current
      }))
    : [];

  return (

    <div>

      <div className="page-header">

        <div>

          <span className="page-label">
            PROCUREMENT STATUS
          </span>

          <h1>
            Track Procurement
          </h1>

          <p>
            Follow every step of your procurement process.
          </p>

        </div>

      </div>


      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !booking && !error && (
        <div className="dashboard-card text-center">
          You have no active procurement. Book a slot to get started.
        </div>
      )}

      {booking && (
      <>
      <div className="dashboard-card status-main-card">

        <div className="status-overview">

          <div>

            <span className="section-small">
              TOKEN NUMBER
            </span>

            <h2 className="status-token">
              {booking.token}
            </h2>

          </div>


          <div className="status-overview-center">

            <span className={`table-status ${statusClass(booking.status)}`}>
              {STATUS_TEXT[booking.status]}
            </span>

            <small>
              Last updated: {formatDateTime(booking.updatedAt) || "Just now"}
            </small>

          </div>


          <div className="status-center-info">

            <small>
              PROCUREMENT CENTER
            </small>

            <strong>
              {booking.center.name}
            </strong>

          </div>

        </div>


        <hr />


        <div className="timeline">

          {steps.map((step, index) => (

            <div
              className={`timeline-item ${
                step.done ? "done" : ""
              } ${step.active ? "active" : ""}`}
              key={step.title}
            >

              <div className="timeline-icon">

                <i className={`bi ${step.icon}`}></i>

              </div>


              <div className="timeline-content">

                <strong>
                  {step.title}
                </strong>

                <small>
                  {step.date}
                </small>

              </div>

            </div>

          ))}

        </div>

      </div>


      <div className="dashboard-card produce-card">

        <div className="card-header">

          <div>

            <span className="section-small">
              PRODUCE DETAILS
            </span>

            <h4>
              Your Procurement
            </h4>

          </div>

        </div>


        <div className="produce-grid">

          <div>

            <small>
              CROP
            </small>

            <strong>
              {booking.crop}
            </strong>

          </div>


          <div>

            <small>
              ESTIMATED QUANTITY
            </small>

            <strong>
              {booking.quantity} Quintal
            </strong>

          </div>


          <div>

            <small>
              BOOKING DATE
            </small>

            <strong>
              {formatDate(booking.date, true)}
            </strong>

          </div>


          <div>

            <small>
              TIME SLOT
            </small>

            <strong>
              {booking.slot} - {booking.endTime}
            </strong>

          </div>

        </div>

      </div>
      </>
      )}

    </div>

  );
}

export default ProcurementStatus;