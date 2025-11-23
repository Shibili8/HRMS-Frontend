import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="hover:underline">
          <span className="gap-5 font-bold text-xl ">HRMS</span>
          </Link>
          <span className="text-m text-blue-100 hidden sm:inline">
            Human Resource Management System
          </span>
          
        </div>

        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden sm:flex gap-5 items-center text-sm sm:text-base">
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
      </div>

      {open && (
        <div className="sm:hidden mt-3 flex flex-col gap-4 bg-blue-700 p-4 rounded-lg text-sm">
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            Dashboard
          </Link>

          <Link
            to="/employees"
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            Employees
          </Link>

          <Link
            to="/teams"
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            Teams
          </Link>

          <Link
            to="/logs"
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            Logs
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
