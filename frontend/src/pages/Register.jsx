// src/pages/Register.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext"; // ✅ Ensure correct path

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useContext(AppContext);

  const [isModal, setIsModal] = useState(true);

  const [formData, setFormData] = useState({
    name: "", // ✅ must be 'name' to match backend
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await handleRegister(
        formData.name, // ✅ use 'name'
        formData.email,
        formData.password
      );
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration error. Check console.");
    }
  };

  // Lock scroll while modal is open
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModal]);

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative z-50 bg-white rounded-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Register</h2>
              <button
                className="text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setIsModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name" // ✅ change from 'username' to 'name'
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="relative z-50 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
