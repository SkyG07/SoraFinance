import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

// Colors used in Dashboard Pie chart
const COLORS = ["#ef4444", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6", "#f472b6", "#a1a1aa"];

// ---------------------
// Demo Summary Values
// ---------------------
const DEMO_INCOME = 25000;
const DEMO_EXPENSE = 18000;
const DEMO_BALANCE = DEMO_INCOME - DEMO_EXPENSE;

// ---------------------
// Demo Line Chart Data 
// ---------------------
const demoLineData = [
  { date: "2025-01-01", income: 2000, expenses: 1200 },
  { date: "2025-01-05", income: 3000, expenses: 2000 },
  { date: "2025-01-10", income: 2500, expenses: 1800 },
  { date: "2025-01-15", income: 4000, expenses: 2200 },
  { date: "2025-01-20", income: 3500, expenses: 2600 },
];

// ---------------------
// Demo Category Pie Data
// ---------------------
const demoCategoryData = [
  { name: "Food", value: 5000 },
  { name: "Bills", value: 2000 },
  { name: "Transport", value: 3000 },
  { name: "Communication", value: 2000 },
  { name: "Entertainment", value: 1000 },
];

// ---------------------
// Demo Recent Transactions
// ---------------------
const demoTransactions = [
  { _id: 1, title: "Salary", amount: 12000, type: "income", date: "2025-01-15" },
  { _id: 2, title: "Groceries", amount: 1500, type: "expense", date: "2025-01-14" },
  { _id: 3, title: "Internet Bill", amount: 999, type: "expense", date: "2025-01-13" },
  { _id: 4, title: "Side Job", amount: 2500, type: "income", date: "2025-01-10" },
  { _id: 5, title: "Transport", amount: 200, type: "expense", date: "2025-01-09" },
];

// ---------------------
// Demo AI Filipino-style Recommendations
// ---------------------
const demoAI = [
  "Maganda ang pagbaba ng Food spending mo this month! Try meal prep para mas makatipid.",
  "Tumaas ng kaunti ang Shopping expenses—try a 24-hour rule bago bumili.",
  "Utilities decreased by ₱300 this month, tuloy-tuloy lang!",
  "Transport spending went up—baka makatulong ang carpooling or ride-sharing discounts.",
];


const Landing = () => {
  return (
    <div className="min-h-screen p-6 bg-base-100 dark:bg-base-200 space-y-6">

      {/* ===========================
          HEADER / HERO SECTION
      ============================ */}
      <header className="text-center space-y-3 pb-4">
        <h1 className="text-5xl font-bold">Welcome to SoraFinance</h1>
        <p className="opacity-80 text-lg">
          Your all-in-one dashboard for budgeting, tracking, and AI-powered financial tips.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <Link to="/login" className="btn btn-primary px-6">Sign in</Link>
          <Link to="/register" className="btn btn-outline px-6">Sign up</Link>
        </div>
      </header>


      {/* ===========================
          SUMMARY CARDS — EXACT STYLE
      ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Income</h3>
          <p className="text-2xl font-bold text-green-500">₱{DEMO_INCOME.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Expenses</h3>
          <p className="text-2xl font-bold text-red-500">₱{DEMO_EXPENSE.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Balance</h3>
          <p className="text-2xl font-bold text-blue-500">₱{DEMO_BALANCE.toLocaleString()}</p>
        </div>
      </div>


      {/* ===========================
          LINE CHART (Dashboard Style)
      ============================ */}
      <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Income & Expenses Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={demoLineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22c55e" />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>


      {/* ===========================
          PIE CHART (Dashboard Style)
      ============================ */}
      <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={demoCategoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {demoCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `₱${v.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>


      {/* ===========================
          RECENT TRANSACTIONS (Dashboard Style)
      ============================ */}
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
            {demoTransactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.title}</td>
                <td>₱{Number(tx.amount).toLocaleString()}</td>
                <td>{tx.type}</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* ===========================
          AI RECOMMENDATIONS (Dashboard Style)
      ============================ */}
      <div className="p-4 bg-base-200 dark:bg-base-300 rounded-lg shadow space-y-3">
        <h3 className="text-lg font-semibold">AI Recommendations</h3>

        {demoAI.map((rec, i) => (
          <div key={i} className="p-3 bg-base-100 dark:bg-base-200 rounded">
            {rec}
          </div>
        ))}
      </div>


      {/* FOOTNOTE */}
      <div className="text-center opacity-50 text-sm">
        *This is demo data. Sign in to see your real dashboard.*
      </div>

    </div>
  );
};

export default Landing;
