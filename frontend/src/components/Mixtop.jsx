import React from "react";

const Mixtop = () => {
  return (
    <div className="bg-white px-6 py-4 shadow-md flex items-center justify-between sticky top-0 z-40">
      <h1 className="text-xl font-semibold text-gray-800">Expense Tracker</h1>

      <div className="flex items-center gap-4">
        {/* Search (optional) */}
        {/* <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring"
        /> */}

        {/* Greeting or User Info Placeholder */}
        <span className="text-sm text-gray-600">Welcome back 👋</span>
      </div>
    </div>
  );
};

export default Mixtop;
