import api from "../api/axios";

export default function AssignedEmployeesModal({ team, onClose }) {
  const members = team.members || [];

  async function removeEmployee(employeeId) {
    if (!window.confirm("Remove this employee?")) return;

    try {
      await api.delete(`/teams/${team.id}/unassign`, {
        data: { employeeId },
      });

      alert("Employee removed");

      team.members = team.members.filter((m) => m.employee_id !== employeeId);

      onClose(true);
    } catch (err) {
      console.error("Unassign error:", err);
      alert("Failed to remove employee");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-sm sm:max-w-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          Employees in {team.name}
        </h2>

        {members.length === 0 ? (
          <p className="text-gray-500 text-sm">No employees assigned</p>
        ) : (
          <ul className="space-y-2">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div className="text-sm">
                  <p className="font-medium">
                    {m.employee?.first_name} {m.employee?.last_name}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {m.employee?.email}
                  </p>
                </div>

                <button
                  onClick={() => removeEmployee(m.employee_id)}
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="text-right mt-3">
          <button
            onClick={() => onClose(false)}
            className="px-3 py-1 text-sm border rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
