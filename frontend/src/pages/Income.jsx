import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext"; // Make sure the path is correct

const Income = () => {
  const { addIncome } = useContext(AppContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.description ||
      !formData.date
    ) {
      alert("Please fill in all fields");
      return;
    }

    await addIncome(
      formData.title,
      formData.amount,
      formData.category,
      formData.description,
      formData.date
    );

    // Clear form
    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Add Income
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Freelance Work"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 5000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Salary, Freelance, Gift"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Optional notes..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Income
        </button>
      </form>
    </div>
  );
};

export default Income;
