import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    orgName: "",
    adminName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!form.email.includes("@")) {
      return setError("Please enter a valid email address.");
    }

    try {
      const res = await api.post("/auth/register", form);
      login(res.data.token);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(msg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-1">
          Register
        </h1>

        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Create your organisation account
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          <input
            name="orgName"
            value={form.orgName}
            onChange={handleChange}
            className="border p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Organisation Name"
            required
          />

          <input
            name="adminName"
            value={form.adminName}
            onChange={handleChange}
            className="border p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Admin Name"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Email Address"
            required
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Password"
            required
          />

          {error && (
            <p className="text-red-600 text-sm sm:text-base font-medium -mt-2">
              {error}
            </p>
          )}

          <button
            className="bg-green-600 text-white p-3 rounded-lg text-sm sm:text-base 
                       hover:bg-green-700 transition shadow-md"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="mt-5 text-center text-sm sm:text-base">
          <p className="text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-600 underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
