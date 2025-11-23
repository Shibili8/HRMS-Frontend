// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">
          Welcome to HRMS Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/employees"
            className="p-6 border rounded-xl shadow bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">Employees</h2>
            <p className="text-gray-600">
              View, add, edit and delete employees.
            </p>
          </Link>

          <Link
            to="/teams"
            className="p-6 border rounded-xl shadow bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">Teams</h2>
            <p className="text-gray-600">
              Organize employees into teams and assign members.
            </p>
          </Link>

          <Link
            to="/logs"
            className="p-6 border rounded-xl shadow bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">Activity Logs</h2>
            <p className="text-gray-600">
              Audit trail for all important actions.
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
