import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import EmployeeForm from "../components/EmployeeForm";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  async function loadEmployees() {
    try {
      setLoading(true);
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Load employees error:", err);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete employee");
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-6">
        
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold">Employees</h1>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
          >
            + Add Employee
          </button>
        </div>


        <div className="sm:hidden">
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : employees.length === 0 ? (
            <p className="text-center py-4">No employees yet.</p>
          ) : (
            <div className="space-y-3">
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <p className="font-semibold text-gray-800">
                    {emp.first_name} {emp.last_name}
                  </p>
                  <p className="text-sm text-gray-600">{emp.email}</p>
                  <p className="text-sm text-gray-600">{emp.phone}</p>

                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() => {
                        setEditing(emp);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600 text-sm"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:block bg-white shadow rounded-xl overflow-hidden">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Phone</th>
                <th className="text-right px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center">
                    No employees yet.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="border-t">
                    <td className="px-4 py-2">
                      {emp.first_name} {emp.last_name}
                    </td>
                    <td className="px-4 py-2">{emp.email}</td>
                    <td className="px-4 py-2">{emp.phone}</td>

                    <td className="px-4 py-2 text-right">
                      <button
                        className="text-blue-600 mr-4 hover:underline"
                        onClick={() => {
                          setEditing(emp);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <EmployeeForm
            editing={editing}
            onClose={() => setShowForm(false)}
            onSaved={loadEmployees}
          />
        )}
      </div>
    </>
  );
}
