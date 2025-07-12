import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

// Create AppContext
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [ExpenseData, setExpenseData] = useState([]);
  const [IncomeData, setIncomeData] = useState([]);
  const [token, setToken] = useState(cookie.get("token") || null);

  const backendUrl = "http://localhost:5000";

  // Set token in axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Fetch Income
  const fetchIncome = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/get-income`);
      setIncomeData(data.data || []);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  // Fetch Expense
  const fetchExpense = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/get-expense`);
      setExpenseData(data.data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Add Income
  const addIncome = async (title, amount, category, description, date) => {
    try {
      await axios.post(`${backendUrl}/api/users/add-income`, {
        title,
        amount,
        category,
        description,
        date,
      });
      toast.success("Income added!");
      fetchIncome();
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income");
    }
  };

  // Add Expense
  const addExpense = async (title, amount, category, description, date) => {
    try {
      await axios.post(`${backendUrl}/api/users/add-expense`, {
        title,
        amount,
        category,
        description,
        date,
      });
      toast.success("Expense added!");
      fetchExpense();
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense");
    }
  };

  // Register
  const handleRegister = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/users/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        cookie.set("token", data.token, { expires: 7 });
        setToken(data.token);
        fetchIncome();
        fetchExpense();
        toast.success(data.message || "Registered successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  // Login
  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/users/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        cookie.set("token", data.token);
        setToken(data.token);
        fetchIncome();
        fetchExpense();
        toast.success(data.message || "Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = () => {
    cookie.remove("token");
    setToken(null);
    setIncomeData([]);
    setExpenseData([]);
    toast.info("Logged out");
    navigate("/login");
  };

  // Fetch on load if token is present
  useEffect(() => {
    if (token) {
      fetchIncome();
      fetchExpense();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        handleRegister,
        handleLogin,
        logout,
        fetchIncome,
        fetchExpense,
        addIncome,
        addExpense,
        IncomeData,
        ExpenseData,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
