import React from "react";
import useApi from "../../utils/useApi";
import { padNum } from "../../utils/format";

const ROW_TEXT = { completed: "Completed", serving: "Serving", waiting: "Waiting", booked: "Booked" };
const MY_TEXT = {
  booked: "Booked - check in on the day to join the queue",
  checked_in: "Currently waiting",
  waiting: "Currently waiting",
  weighing: "Weighing in progress",
  quality_check: "Quality check in progress",
  completed: "Completed"
};

function LiveQueue() {

  const { data, error, loading } = useApi("/queue/live", { poll: 5000 });
  const queue = data?.queue;
  const mine = queue?.mine;

  return (

    <div>

      <div className="page-header">

        <div>

          <span className="page-label">
            LIVE QUEUE
          </span>

          <h1>
            Track Your Queue
          </h1>

          <p>
            Monitor the live procurement queue in real time.
          </p>

        </div>

        <div className="live-indicator">

          <span></span>

          Live

        </div>

      </div>


      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !queue && !error && (
        <div className="dashboard-card text-center">
          You have no active booking. Book a slot to join the queue.
        </div>
      )}

      {queue && (
      <>
      <div className="queue-dashboard-grid">

        {/* TOKEN */}

        <div className="dashboard-card token-card">

          <span className="section-small">
            YOUR TOKEN
          </span>

          <div className="big-token">
            {mine?.token}
          </div>

          <span className="token-status">
            {MY_TEXT[mine?.status] || ""}
          </span>


          <div className="queue-position">

            <div>

              <small>
                YOUR POSITION
              </small>

              <strong>
                {mine?.position ? `#${padNum(mine.position)}` : "—"}
              </strong>

            </div>


            <div>

              <small>
                PEOPLE AHEAD
              </small>

              <strong>
                {mine?.ahead != null ? padNum(mine.ahead) : "—"}
              </strong>

            </div>

          </div>

        </div>


        {/* CURRENT */}

        <div className="dashboard-card current-token-card">

          <span className="section-small">
            NOW SERVING
          </span>

          <div className="current-token">
            {queue.nowServing || "—"}
          </div>

          <p>
            Procurement is currently processing this token.
          </p>


          <div className="next-token">

            <span>
              Next token
            </span>

            <strong>
              {queue.nextToken || "—"}
            </strong>

          </div>

        </div>


        {/* WAIT */}

        <div className="dashboard-card wait-card">

          <span className="section-small">
            ESTIMATED WAIT
          </span>

          <div className="wait-time">
            {mine?.estimatedWaitMinutes ?? "—"}
            <span>min</span>
          </div>

          <p>
            Based on current processing speed.
          </p>

          <div className="refresh-time">

            <i className="bi bi-arrow-clockwise"></i>

            Updated {new Date(queue.updatedAt).toLocaleTimeString()}

          </div>

        </div>

      </div>


      {/* QUEUE LIST */}

      <div className="dashboard-card queue-list-card">

        <div className="card-header">

          <div>

            <span className="section-small">
              QUEUE
            </span>

            <h4>
              Live Queue Status
            </h4>

          </div>

          <span className="center-name">
            <i className="bi bi-geo-alt"></i>
            {queue.center.name}
          </span>

        </div>


        <div className="queue-list">

          {queue.list.map((r) => (

            <div
              key={r.token}
              className={`queue-row ${r.status === "completed" ? "completed-row" : ""} ${r.status === "serving" ? "serving-row" : ""} ${r.isMine ? "my-token" : ""}`}
            >

              <div className="queue-number">
                {r.token}
              </div>

              <div className="queue-person">
                <strong>
                  {r.isMine ? "You" : "Farmer"}
                </strong>
                <small>
                  {r.isMine ? "Your token" : ROW_TEXT[r.status]}
                </small>
              </div>

              <span className={`queue-badge ${r.isMine ? "your-token" : r.status}`}>
                {r.isMine ? "Your Token" : ROW_TEXT[r.status]}
              </span>

            </div>

          ))}

        </div>

      </div>
      </>
      )}

    </div>

  );
}

export default LiveQueue;