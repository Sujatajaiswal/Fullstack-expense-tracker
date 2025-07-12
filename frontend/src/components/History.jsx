import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const History = () => {
  const { IncomeData, ExpenseData } = useContext(AppContext);

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    const cleaned = String(price).replace(/[^0-9.-]+/g, "");
    return parseFloat(cleaned) || 0;
  };

  const [minIncome, setMinIncome] = useState(0);
  const [maxIncome, setMaxIncome] = useState(0);
  const [minExpense, setMinExpense] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);

  useEffect(() => {
    const incomePrices = IncomeData.map((item) => parsePrice(item.amount));
    const expensePrices = ExpenseData.map((item) => parsePrice(item.amount));

    setMinIncome(incomePrices.length ? Math.min(...incomePrices) : 0);
    setMaxIncome(incomePrices.length ? Math.max(...incomePrices) : 0);
    setMinExpense(expensePrices.length ? Math.min(...expensePrices) : 0);
    setMaxExpense(expensePrices.length ? Math.max(...expensePrices) : 0);
  }, [IncomeData, ExpenseData]);

  const chartData = {
    labels: [
      "Total Income",
      "Total Expense",
      "Min Income",
      "Max Income",
      "Min Expense",
      "Max Expense",
    ],
    datasets: [
      {
        data: [
          IncomeData.reduce((sum, item) => sum + parsePrice(item.amount), 0),
          ExpenseData.reduce((sum, item) => sum + parsePrice(item.amount), 0),
          minIncome,
          maxIncome,
          minExpense,
          maxExpense,
        ],
        backgroundColor: [
          "#36A2EB", // Total income
          "#FF6384", // Total expense
          "#4BC0C0", // Min income
          "#FFCE56", // Max income
          "#9966FF", // Min expense
          "#FF9F40", // Max expense
        ],
        hoverBackgroundColor: [
          "#66B3FF",
          "#FF6F91",
          "#70DBD8",
          "#FFD966",
          "#B38FFF",
          "#FFB673",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income and Expense Breakdown",
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="h-full mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Recent History
      </h1>

      <div className="space-y-4 h-72 overflow-y-auto mb-6">
        {IncomeData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-white shadow-lg border border-gray-200 rounded"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-medium text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.date}</p>
            </div>
            <div className="text-sm font-semibold text-green-500">
              ${parsePrice(item.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 h-72 overflow-y-auto mb-6">
        {ExpenseData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-white shadow-lg border border-gray-200 rounded"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-medium text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.date}</p>
            </div>
            <div className="text-sm font-semibold text-red-500">
              ${parsePrice(item.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg p-6 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Spend Overview</h2>
        <div className="h-96">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default History;
