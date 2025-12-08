import Transaction from "../models/transaction.model.js";

// CREATE TRANSACTION
export const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, notes } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount,
      type,
      category,
      date,
      notes,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET ALL TRANSACTIONS (BY USER)
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      date: -1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE TRANSACTION
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Transaction.deleteOne({ _id: req.params.id });

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


