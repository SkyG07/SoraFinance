// src/components/Dashboard/DashboardFilters.jsx
import React from "react";

const DashboardFilters = ({ month, year, setMonth, setYear }) => {
  const months = [
    "All", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = ["All", currentYear - 1, currentYear, currentYear + 1];

  return (
    <div className="flex gap-4 mb-4">
      <select
        className="select"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        {months.map((m, idx) => (
          <option key={idx} value={m}>{m}</option>
        ))}
      </select>

      <select
        className="select"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        {years.map((y, idx) => (
          <option key={idx} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
};

export default DashboardFilters;
