import React from "react";
import { Edit, Trash2 } from "lucide-react";

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full bg-base-200 dark:bg-base-300 rounded-lg shadow">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.title}</td>
              <td>{tx.amount}</td>
              <td>{tx.type}</td>
              <td>{tx.category}</td>
              <td>{tx.date?.split("T")[0]}</td>
              <td>{tx.notes}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(tx)}
                >
                  <Edit className="size-4" />
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onDelete(tx._id)}
                >
                  <Trash2 className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
