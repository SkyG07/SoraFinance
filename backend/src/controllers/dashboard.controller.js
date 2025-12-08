import Transaction from "../models/transaction.model.js";

// GET dashboard summary for logged-in user
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total income
    const incomeAgg = await Transaction.aggregate([
      { $match: { user: userId, type: "income" } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeAgg[0]?.totalIncome || 0;

    // Total expense
    const expenseAgg = await Transaction.aggregate([
      { $match: { user: userId, type: "expense" } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);

    const totalExpense = expenseAgg[0]?.totalExpense || 0;

    // Expense by category
    const expenseByCategory = await Transaction.aggregate([
      { $match: { user: userId, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      expenseByCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard", error });
  }
};
