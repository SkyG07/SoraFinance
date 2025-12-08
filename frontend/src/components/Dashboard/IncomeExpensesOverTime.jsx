// src/components/Dashboard/IncomeExpensesOverTime.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const IncomeExpensesOverTime = ({ transactions }) => {
  // Aggregate by date
  const dataMap = {};
  transactions.forEach((tx) => {
    const date = tx.date?.split("T")[0];
    if (!dataMap[date]) dataMap[date] = { date, income: 0, expenses: 0 };
    if (tx.type === "income") dataMap[date].income += Number(tx.amount);
    if (tx.type === "expense") dataMap[date].expenses += Number(tx.amount);
  });

  const chartData = Object.values(dataMap).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (chartData.length === 0) return null;

  return (
    <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Income & Expenses Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#22c55e" />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpensesOverTime;
