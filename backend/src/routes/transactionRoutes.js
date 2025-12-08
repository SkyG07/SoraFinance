import express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE a transaction
router.post("/", protect, createTransaction);

// GET all transactions for the logged-in user
router.get("/", protect, getTransactions);

// UPDATE a transaction by ID
router.put("/:id", protect, updateTransaction);

// DELETE a transaction by ID
router.delete("/:id", protect, deleteTransaction);

export default router;
