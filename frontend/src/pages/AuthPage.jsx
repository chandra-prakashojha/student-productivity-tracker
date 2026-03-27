import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const handleMouseMove = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={container}>

      {/* 🔥 MOUSE GLOW */}
      <div
        style={{
          position: "absolute",
          top: mouse.y - 200,
          left: mouse.x - 200,
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(99,102,241,0.4), transparent)",
          filter: "blur(80px)",
          pointerEvents: "none"
        }}
      />

      {/* 🔥 BACKGROUND GLOW */}
      <div style={glow1}></div>
      <div style={glow2}></div>

      {/* 🔥 NAVBAR */}
      <div style={navbar}>
        <h2>Placement Tracker</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setIsLogin(true)} style={navBtn}>
            Login
          </button>

          <button onClick={() => setIsLogin(false)} style={navBtnOutline}>
            Sign Up
          </button>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div
        style={{
          ...main,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s ease"
        }}
      >

        {/* LEFT */}
        <div style={left}>

          <h1 style={heading}>
            Track Your <br />
            Placement Journey <br />
            <span style={gradientText}>Like a Pro</span>
          </h1>

          <p style={subtext}>
            A modern platform to manage applications, track interviews,
            and gain insights into your placement performance.
          </p>

          <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
            
            <button
              style={primaryBtn}
              onClick={() => setIsLogin(false)}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              Get Started
            </button>

            <button
              style={secondaryBtn}
              onClick={() => {
                document.getElementById("features").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </button>

          </div>

          <p style={tagline}>
            Dashboard • Pipeline • Analytics
          </p>

        </div>

        {/* RIGHT FORM */}
        <div
          style={{
            ...formCard,
            transform: `translateY(${mouse.y * 0.01}px)`
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          {isLogin ? <Login /> : <Register />}
        </div>

      </div>

      {/* 🔥 CLEAN FEATURES SECTION */}
      <div
        id="features"
        style={{
          padding: "100px 40px",
          background: "#020617",
          color: "white"
        }}
      >

        <h2 style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "36px"
        }}>
          About Placement Tracker
        </h2>

        <p style={{
          textAlign: "center",
          color: "#94a3b8",
          maxWidth: "700px",
          margin: "0 auto 60px"
        }}>
          Placement Tracker is a full-stack applicant tracking system designed
          to help students manage job applications, track interview progress,
          and gain insights into their placement journey.
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap"
        }}>

          <div style={featureCard}>
            <h3>📊 Smart Analytics</h3>
            <p>Track application performance with insights</p>
          </div>

          <div style={featureCard}>
            <h3>📌 Pipeline</h3>
            <p>Manage applications with Kanban workflow</p>
          </div>

          <div style={featureCard}>
            <h3>🕒 Timeline</h3>
            <p>Visualize progress step-by-step</p>
          </div>

          <div style={featureCard}>
            <h3>🔍 Search</h3>
            <p>Quickly find applications with filters</p>
          </div>

          <div style={featureCard}>
            <h3>📁 Export</h3>
            <p>Download application data as CSV</p>
          </div>

          <div style={featureCard}>
            <h3>⚡ Real-Time</h3>
            <p>Instant updates across dashboard</p>
          </div>

        </div>

      </div>

    </div>
  );
};


/* 🔥 STYLES */

const container = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  position: "relative",
  overflow: "hidden"
};

const glow1 = {
  position: "absolute",
  width: "500px",
  height: "500px",
  background: "#2563eb",
  filter: "blur(180px)",
  top: "-150px",
  left: "-150px",
  opacity: "0.4",
  animation: "float 8s ease-in-out infinite"
};

const glow2 = {
  position: "absolute",
  width: "500px",
  height: "500px",
  background: "#6366f1",
  filter: "blur(180px)",
  bottom: "-150px",
  right: "-150px",
  opacity: "0.4",
  animation: "float 10s ease-in-out infinite"
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 60px",
  position: "sticky",
  top: 0,
  backdropFilter: "blur(12px)",
  background: "rgba(2,6,23,0.6)",
  borderBottom: "1px solid #1e293b",
  zIndex: 10
};

const main = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "60px",
  position: "relative",
  zIndex: 2
};

const left = {
  maxWidth: "550px"
};

const heading = {
  fontSize: "60px",
  lineHeight: "1.1"
};

const gradientText = {
  background: "linear-gradient(90deg, #38bdf8, #6366f1, #22c55e)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradientMove 5s linear infinite"
};

const subtext = {
  color: "#94a3b8",
  marginTop: "15px"
};

const tagline = {
  marginTop: "30px",
  color: "#64748b"
};

const formCard = {
  width: "400px",
  background: "rgba(2,6,23,0.6)",
  backdropFilter: "blur(20px)",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #1e293b",
  boxShadow: "0 0 80px rgba(37,99,235,0.4)",
  transition: "transform 0.3s ease"
};

const navBtn = {
  background: "#2563eb",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const navBtnOutline = {
  border: "1px solid #2563eb",
  padding: "8px 16px",
  borderRadius: "8px",
  color: "#2563eb",
  background: "transparent",
  cursor: "pointer"
};

const primaryBtn = {
  background: "linear-gradient(90deg, #2563eb, #6366f1)",
  padding: "12px 24px",
  borderRadius: "10px",
  color: "white",
  border: "none",
  boxShadow: "0 0 20px rgba(99,102,241,0.6)",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const secondaryBtn = {
  border: "1px solid #334155",
  padding: "12px 24px",
  borderRadius: "10px",
  color: "#94a3b8",
  background: "transparent",
  cursor: "pointer"
};

const featureCard = {
  background: "#020617",
  padding: "20px",
  borderRadius: "12px",
  width: "250px",
  border: "1px solid #1e293b"
};

export default AuthPage;