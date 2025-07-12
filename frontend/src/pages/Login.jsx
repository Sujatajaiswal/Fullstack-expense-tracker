import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext"; // ✅ Ensure capital "C"

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AppContext);
  const [isModal, setIsModal] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin(formData.email, formData.password);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative z-50 bg-white rounded-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Login</h2>
              <button
                className="text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setIsModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                className="relative z-50 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-500 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
