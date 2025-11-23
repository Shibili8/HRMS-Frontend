import { Routes, Route, Navigate } from "react-router-dom";
import  AuthProvider  from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
import Logs from "./pages/Logs";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
          }/>
          <Route path="/employees" element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
          }/>
          <Route path="/teams" element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
          }/>
          <Route  path="/logs"  element={
              <ProtectedRoute>
                <Logs />
              </ProtectedRoute>
          }/>
          <Route path="*" element={<div>Not found</div>} />
          
        </Routes>
      </AuthProvider>
    
  );
}

export default App;
