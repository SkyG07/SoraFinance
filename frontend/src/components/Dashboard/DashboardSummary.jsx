// src/components/Dashboard/DashboardSummary.jsx
import React from "react";

const DashboardSummary = ({ income, expenses }) => {
  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Income</h3>
        <p className="text-2xl font-bold text-green-500">₱{income.toLocaleString()}</p>
      </div>
      <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Expenses</h3>
        <p className="text-2xl font-bold text-red-500">₱{expenses.toLocaleString()}</p>
      </div>
      <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Balance</h3>
        <p className="text-2xl font-bold text-blue-500">₱{balance.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DashboardSummary;
