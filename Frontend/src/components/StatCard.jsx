import React from "react";

function StatCard({
  title,
  value,
  icon,
  description,
  type = ""
}) {

  return (

    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        <i className={`bi ${icon}`}></i>
      </div>

      <div className="stat-info">

        <p>{title}</p>

        <h3>{value}</h3>

        <small>
          {description}
        </small>

      </div>

    </div>

  );
}

export default StatCard;