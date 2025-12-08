import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import path from "path";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ai", aiRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // or "build" if using CRA

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // or "build/index.html"
  });
} else {
  // Root route for dev
  app.get("/", (req, res) => {
    res.send("Sora Expense Tracker Backend is running");
  });
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
