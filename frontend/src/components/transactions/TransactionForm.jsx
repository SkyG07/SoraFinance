import React, { useState, useEffect } from "react";

const commonCategories = [
  "Food",
  "Bills",
  "Transportation",
  "Job",
  "Shopping",
  "Other",
];

const TransactionForm = ({ onSubmit, onClose, editTransaction }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
    notes: "",
  });
  const [otherCategory, setOtherCategory] = useState("");

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        title: editTransaction.title,
        amount: editTransaction.amount,
        type: editTransaction.type,
        category: commonCategories.includes(editTransaction.category)
          ? editTransaction.category
          : "Other",
        date: editTransaction.date?.split("T")[0],
        notes: editTransaction.notes || "",
      });
      if (!commonCategories.includes(editTransaction.category)) {
        setOtherCategory(editTransaction.category);
      }
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      category:
        formData.category === "Other" ? otherCategory : formData.category,
    };
    onSubmit(finalData);
    setFormData({
      title: "",
      amount: "",
      type: "income",
      category: "",
      date: "",
      notes: "",
    });
    setOtherCategory("");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        name="title"
        className="input w-full"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        name="amount"
        className="input w-full"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <select
        name="type"
        className="select w-full"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        name="category"
        className="select w-full"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select category</option>
        {commonCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {formData.category === "Other" && (
        <input
          type="text"
          placeholder="Other category"
          className="input w-full"
          value={otherCategory}
          onChange={(e) => setOtherCategory(e.target.value)}
        />
      )}
      <input
        type="date"
        name="date"
        className="input w-full"
        value={formData.date}
        onChange={handleChange}
      />
      <textarea
        placeholder="Notes"
        name="notes"
        className="textarea w-full"
        value={formData.notes}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-2">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {editTransaction ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
