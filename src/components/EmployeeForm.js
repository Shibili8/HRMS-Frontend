import { useState, useEffect } from "react";
import api from "../api/axios";

export default function EmployeeForm({ onClose, onSaved, editing }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        first_name: editing.first_name || "",
        last_name: editing.last_name || "",
        email: editing.email || "",
        phone: editing.phone || "",
      });
    }
  }, [editing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

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
      alert("Failed to save employee");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="First name"
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Last name"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Email"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Phone"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
