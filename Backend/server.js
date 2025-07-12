// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import userRouter from "./routes/userRoutes.js";

// ✅ Load environment variables from .env
dotenv.config();

// ✅ Initialize express app
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware to parse incoming JSON
app.use(express.json());

// ✅ Enable CORS for Vite frontend (usually on http://localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ API Routes (authentication, income, expenses)
app.use("/api/users", userRouter);

// ✅ Fallback route for all undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
