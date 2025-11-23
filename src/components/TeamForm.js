import { useState, useEffect } from "react";
import api from "../api/axios";

export default function TeamForm({ onClose, onSaved, editing }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || "",
        description: editing.description || "",
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
        await api.put(`/teams/${editing.id}`, form);
      } else {
        await api.post("/teams", form);
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error("Save team error:", err);
      alert("Failed to save team");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit Team" : "Add Team"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Team name"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Description"
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
