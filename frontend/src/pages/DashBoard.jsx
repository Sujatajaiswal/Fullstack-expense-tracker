import React, { useContext } from "react"; // Added React import here
import Chart from "../components/Chart"; // Corrected import path
import { AppContext } from "../Context/AppContext"; // Adjusted for relative path

const Dashboard = () => {
  const { IncomeData, ExpenseData } = useContext(AppContext);

  // Renamed parseFloat to avoid conflict with built-in function
  const parseAmount = (amount) => {
    return typeof amount === "number"
      ? amount
      : parseFloat(String(amount).replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters
  };

  const totalIncome = IncomeData.reduce(
    (sum, item) => sum + parseAmount(item.amount),
    0
  );
  const totalExpense = ExpenseData.reduce(
    (sum, item) => sum + parseAmount(item.amount),
    0
  );
  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="flex flex-col overflow-auto">
      <Chart IncomeData={IncomeData} ExpenseData={ExpenseData} />{" "}
      {/* Corrected prop names */}
      <div className="flex flex-row justify-between p-3 w-full h-20">
        <div className="flex flex-col justify-between">
          <h3 className="font-bold text-sm md:text-xl">Total Income</h3>
          <p className="text-xl md:text-2xl text-green-500 font-bold mt-2">
            ${totalIncome.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <h3 className="font-bold text-sm md:text-xl">Total Expense</h3>
          <p className="text-xl md:text-2xl text-red-500 font-bold mt-2">
            ${totalExpense.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="items-center justify-center flex mt-20">
        <div className="flex flex-col items-center justify-between mt-4 w-90">
          <h3 className="font-bold text-lg md:text-3xl underline">
            Total Balance
          </h3>
          <p
            className="font-medium text-3xl md:text-5xl"
            style={{ color: totalBalance < 0 ? "red" : "green" }}
          >
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
