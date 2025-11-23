import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadLogs() {
    try {
      setLoading(true);
      const res = await api.get("/logs");
      setLogs(res.data);
    } catch (err) {
      console.error("Load logs error:", err);
      alert("Failed to load logs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Activity Logs</h1>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Time</th>
                <th className="text-left px-4 py-2">Action</th>
                <th className="text-left px-4 py-2">User ID</th>
                <th className="text-left px-4 py-2">Meta</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center">
                    No logs yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-t">
                    <td className="px-4 py-2">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{log.action}</td>
                    <td className="px-4 py-2">{log.user_id}</td>
                    <td className="px-4 py-2 max-w-xs truncate">
                      <code className="text-xs">
                        {JSON.stringify(log.meta)}
                      </code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
