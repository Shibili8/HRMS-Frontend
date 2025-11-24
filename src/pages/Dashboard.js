import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center sm:text-left">
          Welcome to HRMS Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          <Link
            to="/employees"
            className="p-5 bg-white border rounded-2xl shadow-md 
                     hover:shadow-xl transition-all duration-200 
                     hover:-translate-y-1"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Employees
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              View, add, edit and delete employees.
            </p>
          </Link>

          <Link
            to="/teams"
            className="p-5 bg-white border rounded-2xl shadow-md 
                     hover:shadow-xl transition-all duration-200 
                     hover:-translate-y-1"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Teams
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Organize employees into teams and manage members.
            </p>
          </Link>

          <Link
            to="/logs"
            className="p-5 bg-white border rounded-2xl shadow-md 
                     hover:shadow-xl transition-all duration-200 
                     hover:-translate-y-1"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Activity Logs
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Track all important actions performed in the system.
            </p>
          </Link>

        </div>
      </div>
    </>
  );
}
