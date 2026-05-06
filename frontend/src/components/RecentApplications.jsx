import { motion } from "framer-motion";

const statusColors = {
  Applied: "#3b82f6",
  Interview: "#10b981",
  Rejected: "#ef4444",
};

const RecentApplications = ({ applications }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "rgba(15, 23, 42, 0.9)",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid rgba(59,130,246,0.15)",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
          fontSize: "1.5rem",
        }}
      >
        Recent Applications
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {applications.map((app, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01, y: -3 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "16px",
              padding: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "1.05rem",
                }}
              >
                {app.company}
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "6px",
                  marginBottom: 0,
                }}
              >
                {app.role}
              </p>
            </div>

            <div
              style={{
                background: `${statusColors[app.status]}20`,
                color: statusColors[app.status],
                padding: "8px 14px",
                borderRadius: "999px",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              {app.status}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentApplications;