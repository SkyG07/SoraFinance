// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import DashboardSummary from "../components/Dashboard/DashboardSummary";
import IncomeExpensesOverTime from "../components/Dashboard/IncomeExpensesOverTime";
import ExpensesByCategory from "../components/Dashboard/ExpensesByCategory";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import DashboardFilters from "../components/Dashboard/DashboardFilters";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("All");
  const [year, setYear] = useState("All");
  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(data);
    } catch {
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const txMonth = txDate.toLocaleString("default", { month: "long" });
    const txYear = txDate.getFullYear().toString();
    return (month === "All" || txMonth === month) && (year === "All" || txYear === year);
  });

  const income = filteredTransactions
    .filter(tx => tx.type === "income")
    .reduce((acc, tx) => acc + Number(tx.amount), 0);

  const expenses = filteredTransactions
    .filter(tx => tx.type === "expense")
    .reduce((acc, tx) => acc + Number(tx.amount), 0);

  return (
    <div className="min-h-screen p-6 bg-base-100 dark:bg-base-200 space-y-6">
      <Toaster />
      {loading ? (
        <div className="text-base-content/60">Loading dashboard...</div>
      ) : (
        <>
          <DashboardFilters month={month} year={year} setMonth={setMonth} setYear={setYear} />
          <DashboardSummary income={income} expenses={expenses} />
          <IncomeExpensesOverTime transactions={filteredTransactions} />
          <ExpensesByCategory transactions={filteredTransactions} />
          <RecentTransactions transactions={filteredTransactions} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
