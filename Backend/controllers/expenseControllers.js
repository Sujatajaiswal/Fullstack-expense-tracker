import ExpenseModel from "../models/expenseSchema.js";

// ✅ Add new expense
export const addExpense = async (req, res) => {
  const userId = req.user?.id;
  const { title, amount, category, description, date } = req.body;

  try {
    // Input validation
    if (!title || !amount || !category || !description || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive number" });
    }

    const newExpense = new ExpenseModel({
      userId,
      title: title.trim(),
      amount: parsedAmount,
      category: category.trim(),
      description: description.trim(),
      date,
      type: "expense",
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Expense added",
      data: newExpense,
    });
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get all expenses
export const getExpense = async (req, res) => {
  const userId = req.user?.id;

  try {
    const expenses = await ExpenseModel.find({ userId }).sort({ date: -1 });

    if (!expenses.length) {
      return res
        .status(404)
        .json({ success: false, message: "No expense records found" });
    }

    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    console.error("Get Expense Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Update expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    const expense = await ExpenseModel.findById(id);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    expense.title = title?.trim() || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category?.trim() || expense.category;
    expense.description = description?.trim() || expense.description;
    expense.date = date || expense.date;

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense updated",
      data: expense,
    });
  } catch (error) {
    console.error("Update Expense Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Delete expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ExpenseModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted",
      data: deleted,
    });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
