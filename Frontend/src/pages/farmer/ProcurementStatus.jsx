import React from "react";

function ProcurementStatus() {

  const steps = [
    {
      title: "Slot Booked",
      date: "08 Sep, 09:32 AM",
      icon: "bi-calendar-check",
      done: true
    },
    {
      title: "Checked In",
      date: "08 Sep, 09:48 AM",
      icon: "bi-person-check",
      done: true
    },
    {
      title: "Waiting in Queue",
      date: "Current Status",
      icon: "bi-people",
      done: true,
      active: true
    },
    {
      title: "Weighing",
      date: "Pending",
      icon: "bi-speedometer2",
      done: false
    },
    {
      title: "Quality Check",
      date: "Pending",
      icon: "bi-clipboard-check",
      done: false
    },
    {
      title: "Procurement Completed",
      date: "Pending",
      icon: "bi-check-circle",
      done: false
    }
  ];

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


      <div className="dashboard-card status-main-card">

        <div className="status-overview">

          <div>

            <span className="section-small">
              TOKEN NUMBER
            </span>

            <h2 className="status-token">
              A-105
            </h2>

          </div>


          <div className="status-overview-center">

            <span className="table-status waiting">
              Waiting in Queue
            </span>

            <small>
              Last updated: Just now
            </small>

          </div>


          <div className="status-center-info">

            <small>
              PROCUREMENT CENTER
            </small>

            <strong>
              Lucknow Mandi Center
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
              Wheat
            </strong>

          </div>


          <div>

            <small>
              ESTIMATED QUANTITY
            </small>

            <strong>
              45 Quintal
            </strong>

          </div>


          <div>

            <small>
              BOOKING DATE
            </small>

            <strong>
              08 September 2026
            </strong>

          </div>


          <div>

            <small>
              TIME SLOT
            </small>

            <strong>
              10:00 AM - 11:00 AM
            </strong>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProcurementStatus;