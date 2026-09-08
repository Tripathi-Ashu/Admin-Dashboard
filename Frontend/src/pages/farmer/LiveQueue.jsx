import React from "react";

function LiveQueue() {

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


      <div className="queue-dashboard-grid">

        {/* TOKEN */}

        <div className="dashboard-card token-card">

          <span className="section-small">
            YOUR TOKEN
          </span>

          <div className="big-token">
            A-105
          </div>

          <span className="token-status">
            Currently waiting
          </span>


          <div className="queue-position">

            <div>

              <small>
                YOUR POSITION
              </small>

              <strong>
                #04
              </strong>

            </div>


            <div>

              <small>
                PEOPLE AHEAD
              </small>

              <strong>
                03
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
            A-101
          </div>

          <p>
            Procurement is currently processing this token.
          </p>


          <div className="next-token">

            <span>
              Next token
            </span>

            <strong>
              A-102
            </strong>

          </div>

        </div>


        {/* WAIT */}

        <div className="dashboard-card wait-card">

          <span className="section-small">
            ESTIMATED WAIT
          </span>

          <div className="wait-time">
            24
            <span>min</span>
          </div>

          <p>
            Based on current processing speed.
          </p>

          <div className="refresh-time">

            <i className="bi bi-arrow-clockwise"></i>

            Updated just now

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
            Lucknow Mandi Center
          </span>

        </div>


        <div className="queue-list">

          <div className="queue-row completed-row">

            <div className="queue-number">
              A-100
            </div>

            <div className="queue-person">
              <strong>
                Farmer
              </strong>
              <small>
                Completed
              </small>
            </div>

            <span className="queue-badge completed">
              Completed
            </span>

          </div>


          <div className="queue-row serving-row">

            <div className="queue-number">
              A-101
            </div>

            <div className="queue-person">
              <strong>
                Current Token
              </strong>
              <small>
                Procurement in progress
              </small>
            </div>

            <span className="queue-badge serving">
              Serving
            </span>

          </div>


          <div className="queue-row">

            <div className="queue-number">
              A-102
            </div>

            <div className="queue-person">
              <strong>
                Farmer
              </strong>
              <small>
                Waiting
              </small>
            </div>

            <span className="queue-badge waiting">
              Waiting
            </span>

          </div>


          <div className="queue-row">

            <div className="queue-number">
              A-103
            </div>

            <div className="queue-person">
              <strong>
                Farmer
              </strong>
              <small>
                Waiting
              </small>
            </div>

            <span className="queue-badge waiting">
              Waiting
            </span>

          </div>


          <div className="queue-row my-token">

            <div className="queue-number">
              A-105
            </div>

            <div className="queue-person">

              <strong>
                You
              </strong>

              <small>
                Your token
              </small>

            </div>

            <span className="queue-badge your-token">
              Your Token
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}

export default LiveQueue;