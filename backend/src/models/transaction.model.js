import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    date: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
