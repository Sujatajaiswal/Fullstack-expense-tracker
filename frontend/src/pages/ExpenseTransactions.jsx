import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { FiTrash2 } from "react-icons/fi";

const ExpenseTransactions = () => {
  const { ExpenseData, deleteExpense } = useContext(AppContext);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(id);
    }
  };

  return (
    <div className="max-w-full p-4 mt-14">
      <h1 className="text-3xl font-semibold mb-6 text-start">
        Expense Transactions
      </h1>

      <div className="overflow-x-auto pr-8">
        {ExpenseData.length === 0 ? (
          <p className="text-gray-500">No expense transactions found.</p>
        ) : (
          <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {ExpenseData.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">{transaction.title}</td>
                  <td className="p-4">{transaction.category}</td>
                  <td className="p-4">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right text-red-500 font-semibold">
                    ₹{Number(transaction.amount).toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
