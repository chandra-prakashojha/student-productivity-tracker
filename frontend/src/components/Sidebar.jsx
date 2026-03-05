import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div style={sidebarStyle}>

      <h2 style={{ marginBottom: "30px" }}>
        Placement Tracker
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <Link to="/students" style={linkStyle}>
          Students
        </Link>

        <Link to="/applications" style={linkStyle}>
          Applications
        </Link>

        <button
          onClick={handleLogout}
          style={logoutButton}
        >
          Logout
        </button>

      </nav>

    </div>

  );

};

const sidebarStyle = {

  width: "220px",
  height: "100vh",
  background: "#020617",
  padding: "30px",
  color: "white",
  borderRight: "1px solid #1e293b",
  position: "fixed"

};

const linkStyle = {

  color: "white",
  textDecoration: "none",
  padding: "8px",
  borderRadius: "6px"

};

const logoutButton = {

  marginTop: "20px",
  padding: "8px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"

};

export default Sidebar;