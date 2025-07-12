// routes/userRoutes.js
import express from "express";
import { login, register } from "../controllers/userControllers.js";

// Income Controllers
import {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeControllers.js";

// Expense Controllers
import {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseControllers.js";

// Middleware
import authMiddleware from "../middlewares/authMiddleware.js";

// Initialize router
const userRouter = express.Router();

// 🟢 Public Auth Routes
userRouter.post("/register", register);
userRouter.post("/login", login);

// 🔒 Income Routes (protected)
userRouter.post("/add-income", authMiddleware, addIncome);
userRouter.get("/get-income", authMiddleware, getIncome);
userRouter.put("/update-income/:id", authMiddleware, updateIncome);
userRouter.delete("/delete-income/:id", authMiddleware, deleteIncome);

// 🔒 Expense Routes (protected)
userRouter.post("/add-expense", authMiddleware, addExpense);
userRouter.get("/get-expense", authMiddleware, getExpense);
userRouter.put("/update-expense/:id", authMiddleware, updateExpense);
userRouter.delete("/delete-expense/:id", authMiddleware, deleteExpense);

// Export router
export default userRouter;
