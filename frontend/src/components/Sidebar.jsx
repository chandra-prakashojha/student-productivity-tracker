import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={{ marginBottom: "40px" }}>Placement Tracker</h2>

      <nav style={navStyle}>
        <NavLink to="/dashboard" style={navLinkStyle}>
          Dashboard
        </NavLink>

        {user?.role === "admin" && (
          <NavLink to="/students" style={navLinkStyle}>
            Students
          </NavLink>
        )}

        <NavLink to="/applications" style={navLinkStyle}>
          Applications
        </NavLink>

        <NavLink to="/pipeline" style={navLinkStyle}>
          Pipeline
        </NavLink>

        <NavLink to="/companies" style={navLinkStyle}>
          Companies
        </NavLink>

        <button onClick={handleLogout} style={logoutButton}>
          Logout
        </button>
      </nav>
    </div>
  );
};

/* Sidebar container */

const sidebarStyle = {
  width: "220px",
  height: "100vh",
  background: "#020617",
  padding: "30px 20px",
  color: "white",
  borderRight: "1px solid #1e293b",
  position: "fixed",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column"
};

/* Navigation container */

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

/* NavLink style */

const navLinkStyle = ({ isActive }) => ({
  color: "white",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: "8px",
  background: isActive ? "#1e293b" : "transparent",
  transition: "0.2s"
});

/* Logout button */

const logoutButton = {
  marginTop: "30px",
  padding: "10px",
  background: "#ef4444",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

export default Sidebar;