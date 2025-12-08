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
app.use(cors()); // You can remove this later if frontend and backend are on same domain
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ai", aiRoutes);

// Serve React frontend in production
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

// Root route for backend-only
app.get("/api", (req, res) => {
  res.send("SoraFinance Backend is running");
});

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
