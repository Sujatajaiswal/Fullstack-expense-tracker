// src/pages/Expenses.jsx
import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext"; // ✅ Ensure correct path

const Expenses = () => {
  const { addExpense } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Amount must be a positive number");
      return;
    }

    // Call context function
    addExpense(
      formData.title,
      amount,
      formData.category,
      formData.description,
      formData.date
    );

    // Reset form
    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
  };

  return (
    <div className="mx-auto max-w-2xl mt-10 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Add Expense</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Expense Title"
          required
        />

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Amount"
          step="0.01"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="bills">Bills</option>
          <option value="shopping">Shopping</option>
          <option value="transport">Transport</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="gifts">Gifts</option>
          <option value="personal">Personal</option>
          <option value="household">Household</option>
          <option value="others">Others</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Optional description"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Expenses;
