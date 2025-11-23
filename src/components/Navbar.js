import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="font-bold text-xl">HRMS</span>
        <span className="text-sm text-blue-100 hidden sm:inline">
          Human Resource Management System
        </span>
      </div>

      <div className="flex gap-4 items-center text-sm sm:text-base">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/employees" className="hover:underline">
          Employees
        </Link>
        <Link to="/teams" className="hover:underline">
          Teams
        </Link>
        <Link to="/logs" className="hover:underline">
          Logs
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-2"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
