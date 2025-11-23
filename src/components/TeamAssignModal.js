import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TeamAssignModal({ team, onClose, onAssigned }) {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Load employees error:", err);
        alert("Failed to load employees");
      }
    }
    loadEmployees();
  }, []);

  async function handleAssign(e) {
    e.preventDefault();
    if (!employeeId) return alert("Select an employee first");

    try {
      const res = await api.post(`/teams/${team.id}/assign`, {
        employeeId: Number(employeeId),
      });

      alert("Employee assigned successfully");
      
      if (onAssigned) onAssigned();

      onClose();

    } catch (err) {
      console.error("Assign error:", err);

      if (err.response?.status === 404) {
        return alert("Employee or Team not found in your organisation");
      }

      if (err.response?.status === 400) {
        return alert(err.response?.data?.message || "Already assigned");
      }

      alert("Failed to assign employee");
    }
  }

  const assignedIds = team.employeeTeams?.map((et) => et.employee_id) || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Assign Employee to {team.name}
        </h2>

        <form onSubmit={handleAssign} className="flex flex-col gap-4">

          <select
            className="border p-2 rounded"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select employee</option>

            {employees.map((emp) => {
              const isAssigned = assignedIds.includes(emp.id);

              return (
                <option
                  key={emp.id}
                  value={emp.id}
                  disabled={isAssigned}
                >
                  {emp.first_name} {emp.last_name} ({emp.email})
                  {isAssigned ? " — Already Assigned" : ""}
                </option>
              );
            })}
          </select>

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
              className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Assign
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
