import IncomeModel from "../models/incomeSchema.js";

// ✅ Add new income
const addIncome = async (req, res) => {
  const userId = req.user?.id;
  const { title, amount, category, description, date } = req.body;

  try {
    // Validation
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

    // Create new income document
    const newIncome = new IncomeModel({
      userId,
      title,
      amount: parsedAmount,
      category,
      description,
      date,
      type: "income",
    });

    await newIncome.save();

    res.status(201).json({
      success: true,
      message: "Income Added",
      data: newIncome,
    });
  } catch (error) {
    console.error("Add Income Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get all incomes for logged-in user
const getIncome = async (req, res) => {
  const userId = req.user?.id;

  try {
    const incomes = await IncomeModel.find({ userId }).sort({ date: -1 });

    if (!incomes.length) {
      return res
        .status(404)
        .json({ success: false, message: "No income records found" });
    }

    res.status(200).json({ success: true, data: incomes });
  } catch (error) {
    console.error("Get Income Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Update income by ID
const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    const income = await IncomeModel.findById(id);

    if (!income) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    income.title = title || income.title;
    income.amount = amount || income.amount;
    income.category = category || income.category;
    income.description = description || income.description;
    income.date = date || income.date;

    await income.save();

    res.status(200).json({
      success: true,
      message: "Income Updated",
      data: income,
    });
  } catch (error) {
    console.error("Update Income Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Delete income by ID
const deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await IncomeModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    res.status(200).json({
      success: true,
      message: "Income Deleted",
      data: deleted,
    });
  } catch (error) {
    console.error("Delete Income Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addIncome, getIncome, updateIncome, deleteIncome };
