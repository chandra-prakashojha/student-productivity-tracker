import Companies from "./pages/Companies";


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Applications from "./pages/Applications";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Router>

      <Routes>

        {/* Public Routes */}
        <Route path="/companies" element={<Companies />} />

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}

        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>

    </Router>

  );

}

export default App;