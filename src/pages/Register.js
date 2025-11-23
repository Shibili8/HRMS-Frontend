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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Register Organisation
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            name="orgName"
            value={form.orgName}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Organisation Name"
            required
          />
          <input
            name="adminName"
            value={form.adminName}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Admin Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Password"
            required
          />
          {error && (
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          )}

          <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Do you already have an account?
            <Link to="/login" className="text-blue-600 underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
