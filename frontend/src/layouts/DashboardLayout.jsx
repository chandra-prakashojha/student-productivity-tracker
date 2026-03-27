import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          marginLeft: "220px",   // sidebar width
          width: "100%",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          justifyContent: "center"
        }}
      >
        {/* Content Container */}
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",   // keeps dashboard centered
            padding: "40px 30px"
          }}
        >
          {children}
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;