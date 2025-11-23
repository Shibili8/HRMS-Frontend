import { useEffect, useState } from "react";
import api from "../api/axios";
import TeamAssignModal from "../components/TeamAssignModal";
import AssignedEmployeesModal from "../components/AssignedEmployeesModal";
import Navbar from "../components/Navbar";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEmployeesModal, setShowEmployeesModal] = useState(false);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  async function loadTeams() {
    const res = await api.get("/teams");
    setTeams(res.data);
  }

  useEffect(() => {
    loadTeams();
  }, []);

  async function deleteTeam(teamId) {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      await api.delete(`/teams/${teamId}`);
      alert("Team deleted successfully");
      loadTeams();
    } catch (err) {
      console.error("Delete team error:", err);
      alert("Failed to delete team");
    }
  }

  function openEdit(team) {
    setSelectedTeam(team);
    setEditName(team.name || "");
    setEditDescription(team.description || "");
    setShowEditModal(true);
  }

  async function updateTeam(e) {
    e.preventDefault();
    try {
      await api.put(`/teams/${selectedTeam.id}`, {
        name: editName,
        description: editDescription,
      });

      alert("Team updated successfully");
      setShowEditModal(false);
      loadTeams();
    } catch (err) {
      console.error("Update team error:", err);
      alert("Failed to update team");
    }
  }

  async function createTeam(e) {
    e.preventDefault();
    if (!newName.trim()) {
      alert("Team name is required");
      return;
    }

    try {
      await api.post("/teams", {
        name: newName,
        description: newDescription,
      });

      alert("Team created successfully");
      setShowCreateModal(false);
      setNewName("");
      setNewDescription("");
      loadTeams();
    } catch (err) {
      console.error("Create team error:", err);
      alert("Failed to create team");
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Teams</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            + Add Team
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Assigned Employees</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team) => (
              <tr key={team.id} className="border-b">
                <td className="p-2">{team.name}</td>

                <td className="p-2">
                  {team.description}

                  <button
                    onClick={() => {
                      setSelectedTeam(team);
                      setShowEmployeesModal(true);
                    }}
                    className="ml-3 text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    View Assigned
                  </button>
                </td>

                <td className="p-2">
                    {team.members?.length || 0}
                </td>

                <td className="p-2 flex gap-2 flex-wrap">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => {
                      setSelectedTeam(team);
                      setShowAssignModal(true);
                    }}
                  >
                    Assign
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                    onClick={() => openEdit(team)}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => deleteTeam(team.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAssignModal && selectedTeam && (
            <TeamAssignModal
                team={selectedTeam}
                onClose={() => setShowAssignModal(false)}
                onAssigned={() => loadTeams()}  
            />
        )}

        {showEmployeesModal && selectedTeam && (
          <AssignedEmployeesModal
            team={selectedTeam}
            onClose={() => setShowEmployeesModal(false)}
          />
        )}

        {showEditModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Team</h2>

              <form onSubmit={updateTeam} className="flex flex-col gap-4">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Team Name"
                />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Description"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-3 py-1 rounded border"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-1 bg-blue-600 text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Add New Team</h2>

              <form onSubmit={createTeam} className="flex flex-col gap-4">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Team Name"
                />

                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Description"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-3 py-1 rounded border"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-1 bg-green-600 text-white rounded"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
