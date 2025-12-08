// src/components/Dashboard/ExpensesByCategory.jsx
import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#ef4444", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6", "#f472b6", "#a1a1aa"];

const ExpensesByCategory = ({ transactions }) => {
  const dataMap = {};
  transactions
    .filter(tx => tx.type === "expense")
    .forEach(tx => {
      const cat = tx.category || "Other";
      if (!dataMap[cat]) dataMap[cat] = 0;
      dataMap[cat] += Number(tx.amount);
    });

  const chartData = Object.keys(dataMap).map(key => ({ name: key, value: dataMap[key] }));

  if (chartData.length === 0) return null;

  return (
    <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesByCategory;
