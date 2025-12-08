// Transactions.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";
import DashboardFilters from "../components/Dashboard/DashboardFilters";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [month, setMonth] = useState("All");
  const [year, setYear] = useState("All");

  const token = localStorage.getItem("token");

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/transactions", {
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

  // Filter transactions based on month/year
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const txMonth = txDate.toLocaleString("default", { month: "long" });
    const txYear = txDate.getFullYear().toString();
    return (
      (month === "All" || txMonth === month) &&
      (year === "All" || txYear === year)
    );
  });

  // Add or edit transactions
  const handleAddEdit = async (data) => {
    try {
      if (editTransaction) {
        await axios.put(`/api/transactions/${editTransaction._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Transaction updated!");
      } else {
        await axios.post("/api/transactions", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Transaction added!");
      }
      setModalOpen(false);
      setEditTransaction(null);
      fetchTransactions();
    } catch {
      toast.error("Failed to save transaction");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    try {
      await axios.delete(`/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Transaction deleted!");
      fetchTransactions();
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-base-100 dark:bg-base-200 space-y-6">
      <Toaster />
      <DashboardFilters
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-base-content">Transactions</h2>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="size-4" /> Add Transaction
        </button>
      </div>

      {loading ? (
        <div className="text-base-content/60">Loading transactions...</div>
      ) : filteredTransactions.length === 0 ? (
        <div className="p-6 bg-base-200 dark:bg-base-300 rounded-lg shadow">
          No transactions for selected filters.
        </div>
      ) : (
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={(tx) => {
            setEditTransaction(tx);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* Transaction Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-base-100 dark:bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {editTransaction ? "Edit Transaction" : "Add Transaction"}
            </h3>
            <TransactionForm
              onSubmit={handleAddEdit}
              onClose={() => {
                setModalOpen(false);
                setEditTransaction(null);
              }}
              editTransaction={editTransaction}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
