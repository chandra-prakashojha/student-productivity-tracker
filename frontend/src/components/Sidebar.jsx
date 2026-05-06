import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const renderLink = (to, label) => (
    <NavLink to={to} style={navLinkStyle}>
      {({ isActive }) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            position: "relative"
          }}
        >
          {/* Left active bar */}
          <div
            style={{
              width: "4px",
              height: "18px",
              borderRadius: "4px",
              background: isActive ? "#3b82f6" : "transparent",
              transition: "0.2s"
            }}
          />

          {/* Text */}
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  );

  return (
    <div style={sidebarStyle}>
      <h2 style={titleStyle}>Placement Tracker</h2>

      <nav style={navStyle}>
        {renderLink("/dashboard", "Dashboard")}

        {user?.role === "admin" &&
          renderLink("/students", "Students")}

        {renderLink("/applications", "Applications")}
        {renderLink("/pipeline", "Pipeline")}
        {renderLink("/companies", "Companies")}

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
  background: "linear-gradient(180deg, #020617, #020617 60%, #020617)",
  padding: "30px 20px",
  color: "white",
  borderRight: "1px solid rgba(255,255,255,0.05)",
  position: "fixed",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  boxShadow: "inset -1px 0 0 rgba(255,255,255,0.05)"
};

/* Title */

const titleStyle = {
  marginBottom: "35px",
  fontSize: "22px",
  fontWeight: "700",
  letterSpacing: "0.5px",
  lineHeight: "1.3"
};

/* Navigation container */

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flex: 1
};

/* NavLink style */

const navLinkStyle = ({ isActive }) => ({
  color: "#cbd5f5",
  textDecoration: "none",
  padding: "12px 14px",
  borderRadius: "10px",
  background: isActive ? "rgba(59,130,246,0.15)" : "transparent",
  border: isActive
    ? "1px solid rgba(59,130,246,0.3)"
    : "1px solid transparent",
  boxShadow: isActive
    ? "0 0 20px rgba(59,130,246,0.15)"
    : "none",
  transition: "all 0.2s ease",
  fontWeight: "500"
});

/* Logout button */

const logoutButton = {
  marginTop: "auto",
  padding: "12px",
  background: "linear-gradient(135deg, #ef4444, #f87171)",
  border: "none",
  borderRadius: "12px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: "0 10px 25px rgba(239,68,68,0.3)",
  transition: "all 0.2s ease"
};

export default Sidebar;