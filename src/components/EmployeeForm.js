// frontend/src/components/EmployeeForm.jsx
import { useState, useEffect } from "react";
import api from "../api/axios";

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
};

export default function EmployeeForm({ onClose, onSaved, editing }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setForm({
        first_name: editing.first_name || "",
        last_name: editing.last_name || "",
        email: editing.email || "",
        phone: editing.phone || "",
      });
    } else {
      setForm(emptyForm);
    }
    setError(""); // clear previous errors whenever mode changes
  }, [editing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Frontend quick validation
    if (!form.first_name.trim()) {
      setError("First name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    // basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      if (editing) {
        await api.put(`/employees/${editing.id}`, form);
      } else {
        await api.post("/employees", form);
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error("Employee save error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save employee. Try again.");
      }
    }
  }

  function handleCancel() {
    setForm(editing ? {
      first_name: editing.first_name || "",
      last_name: editing.last_name || "",
      email: editing.email || "",
      phone: editing.phone || "",
    } : emptyForm);
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          {editing ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="border p-2 rounded text-sm sm:text-base"
            placeholder="First name"
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="border p-2 rounded text-sm sm:text-base"
            placeholder="Last name"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded text-sm sm:text-base"
            placeholder="Email"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded text-sm sm:text-base"
            placeholder="Phone"
          />

          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1 text-sm sm:text-base rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 sm:px-4 sm:py-1 bg-blue-600 text-white rounded text-sm sm:text-base hover:bg-blue-700"
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
