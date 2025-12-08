import express from "express";
import { getAIRecommendations } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/recommend", protect, getAIRecommendations);

export default router;
