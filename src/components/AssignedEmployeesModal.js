import api from "../api/axios";

export default function AssignedEmployeesModal({ team, onClose }) {
  const members = team.members || [];

  async function removeEmployee(employeeId) {
    if (!window.confirm("Remove this employee from the team?")) return;

    try {
      await api.delete(`/teams/${team.id}/unassign`, {
        data: { employeeId }
      });

      alert("Employee removed from team");

      team.members = team.members.filter(
        (m) => m.employee_id !== employeeId
      );

      onClose(true);  
    } catch (err) {
      console.error("Unassign error:", err);
      alert("Failed to remove employee");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Assigned Employees in {team.name}
        </h2>

        {members.length === 0 ? (
          <p className="text-gray-500">No employees assigned</p>
        ) : (
          <ul className="space-y-3">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div>
                  <p className="font-medium">
                    {m.employee?.first_name} {m.employee?.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {m.employee?.email}
                  </p>
                </div>

                <button
                  onClick={() => removeEmployee(m.employee_id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="text-right mt-4">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-1 border rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
