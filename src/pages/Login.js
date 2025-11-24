import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      return setError("Please enter a valid email address.");
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
      setError(msg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">

        {/* Title Section */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-1">
          Login
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Welcome back! Please sign in to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="email"
            className="border p-3 rounded-lg text-sm sm:text-base
                       focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="border p-3 rounded-lg text-sm sm:text-base
                       focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error Display */}
          {error && (
            <p className="text-red-600 text-sm sm:text-base font-medium -mt-2">
              {error}
            </p>
          )}

          <button
            className="bg-blue-600 text-white p-3 rounded-lg text-sm sm:text-base
                       hover:bg-blue-700 transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-5 text-center text-sm sm:text-base">
          <p className="text-gray-600">
            Don’t have an account?
            <Link
              to="/register"
              className="text-blue-600 underline ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
