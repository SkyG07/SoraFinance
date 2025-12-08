// src/components/Dashboard/RecentTransactions.jsx
import React from "react";

const RecentTransactions = ({ transactions }) => {
  const recent = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  ).slice(0, 5); // Show last 5 transactions

  if (recent.length === 0)
    return (
      <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
        No recent transactions
      </div>
    );

  return (
    <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.title}</td>
              <td>₱{Number(tx.amount).toLocaleString()}</td>
              <td>{tx.type}</td>
              <td>{tx.date?.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
