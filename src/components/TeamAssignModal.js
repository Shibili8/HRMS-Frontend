import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TeamAssignModal({ team, onClose, onAssigned }) {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");  

  useEffect(() => {
    async function loadEmployees() {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Load employees error:", err);
        setErrorMsg("Failed to load employees"); 
      }
    }
    loadEmployees();
  }, []);

  async function handleAssign(e) {
    e.preventDefault();
    setErrorMsg(""); 

    if (!employeeId) {
      setErrorMsg("Please select an employee"); 
      return;
    }

    try {
      await api.post(`/teams/${team.id}/assign`, {
        employeeId: Number(employeeId),
      });

      if (onAssigned) onAssigned();
      onClose();

    } catch (err) {
      console.error("Assign error:", err);

      if (err.response?.status === 404) {
        return setErrorMsg("Employee or team not found in your organisation");
      }

      if (err.response?.status === 400) {
        return setErrorMsg(err.response?.data?.message || "Already assigned");
      }

      setErrorMsg("Failed to assign employee");
    }
  }

  const assignedIds = team.employeeTeams?.map((et) => et.employee_id) || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-sm sm:max-w-md">
        
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          Assign to {team.name}
        </h2>

        <form onSubmit={handleAssign} className="flex flex-col gap-3">

          <select
            className="border p-2 rounded text-sm"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select employee</option>

            {employees.map((emp) => {
              const isAssigned = assignedIds.includes(emp.id);

              return (
                <option key={emp.id} value={emp.id} disabled={isAssigned}>
                  {emp.first_name} {emp.last_name} ({emp.email})
                  {isAssigned ? " — Assigned" : ""}
                </option>
              );
            })}
          </select>
          {errorMsg && (
            <p className="text-red-600 text-sm mb-2">{errorMsg}</p>
          )}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                setEmployeeId(""); 
              }}
              className="px-3 py-1 text-sm rounded border"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            >
              Assign
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
