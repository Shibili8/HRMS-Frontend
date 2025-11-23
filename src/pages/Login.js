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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            className="border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          )}

          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Don’t have an account?
            <Link to="/register" className="text-blue-600 underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
