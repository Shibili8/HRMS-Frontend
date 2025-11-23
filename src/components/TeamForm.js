import { useState, useEffect } from "react";
import api from "../api/axios";

export default function TeamForm({ onClose, onSaved, editing }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [errorMsg, setErrorMsg] = useState(""); 

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
    setErrorMsg(""); 

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

      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Failed to save team");
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md">

        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          {editing ? "Edit Team" : "Add Team"}
        </h2>

        {errorMsg && (
          <p className="text-red-600 text-sm mb-2">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded text-sm"
            placeholder="Team name"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded text-sm min-h-[90px]"
            placeholder="Description"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm rounded border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
