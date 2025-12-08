import rateLimit from "express-rate-limit";

// Limit each IP to 100 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 100 requests per window
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
});
