import React, { useContext } from "react";
import {
  FaCreditCard,
  FaArrowDown,
  FaArrowUp,
  FaChartLine,
  FaMoneyBillWave,
  FaHome,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { AppContext } from "../Context/AppContext"; // ✅ Correct context path
import { Link, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import logo from "../assets/logo4.png";

const SideBar = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    cookie.remove("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-l from-black to-gray-700 h-screen flex flex-col">
      {/* Logo */}
      <div className="mt-3 py-2 px-2">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="mt-1 w-44 hidden md:block cursor-pointer"
        />
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="w-12 block md:hidden cursor-pointer"
        />
      </div>

      {/* Links */}
      <div className="flex flex-col gap-1 p-2">
        <SidebarLink to="/" icon={<FaHome />} label="Dashboard" />
        <SidebarLink
          to="/view-transaction"
          icon={<FaCreditCard />}
          label="Transactions"
        />
        <SidebarLink
          to="/income-transactions"
          icon={<FaArrowDown />}
          label="Income History"
        />
        <SidebarLink
          to="/expense-transactions"
          icon={<FaArrowUp />}
          label="Expense History"
        />
        <SidebarLink
          to="/add-income"
          icon={<FaChartLine />}
          label="Add Income"
        />
        <SidebarLink
          to="/add-expense"
          icon={<FaMoneyBillWave />}
          label="Add Expense"
        />
      </div>

      {/* Footer - Logout or Login */}
      <div className="mt-auto px-2 pb-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 py-2 px-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            <FaSignOutAlt className="text-white text-xl" />
            <span className="text-white hidden md:inline font-semibold">
              Logout
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex w-full items-center justify-center gap-2 py-2 px-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
          >
            <FaSignInAlt className="text-white text-xl" />
            <span className="text-white hidden md:inline font-semibold">
              Login
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

// ✅ Reusable Link Item
const SidebarLink = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-center md:justify-start gap-3 px-3 py-2 rounded-lg hover:bg-red-500 transition"
    >
      <span className="text-white text-xl">{icon}</span>
      <span className="text-white hidden md:inline font-semibold">{label}</span>
    </Link>
  );
};

export default SideBar;
