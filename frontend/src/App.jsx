// src/App.jsx
import React, { useEffect, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AppContext } from "./Context/AppContext";

// Layout Components
import SideBar from "./components/SideBar";
import Mixtop from "./components/Mixtop";

// Pages
import ViewTransactions from "./pages/ViewTransactions";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses"; // ✅ Correct file name match
import IncomeTransactions from "./pages/IncomeTransactions";
import ExpenseTransactions from "./pages/ExpenseTransactions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const location = useLocation();
  const { token, fetchIncome, fetchExpense } = useContext(AppContext);

  // Paths where Sidebar & Topbar should be hidden
  const hideLayoutPaths = ["/login", "/register"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  // Fetch income and expense data when token is present
  useEffect(() => {
    if (token) {
      fetchIncome();
      fetchExpense();
    }
  }, [token]);

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      {!hideLayout && <SideBar />}

      <div className="flex-1 max-h-screen w-full overflow-auto">
        {/* Topbar */}
        {!hideLayout && <Mixtop />}

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/view-transaction"
            element={token ? <ViewTransactions /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-income"
            element={token ? <Income /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-expense"
            element={token ? <Expenses /> : <Navigate to="/login" />}
          />
          <Route
            path="/income-transactions"
            element={token ? <IncomeTransactions /> : <Navigate to="/login" />}
          />
          <Route
            path="/expense-transactions"
            element={token ? <ExpenseTransactions /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Fallback route */}
          <Route
            path="*"
            element={
              <div className="p-4 text-red-600">404 - Page Not Found</div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
