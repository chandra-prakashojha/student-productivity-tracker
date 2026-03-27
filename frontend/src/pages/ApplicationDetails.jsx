import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApplicationDetails = () => {

  const { id } = useParams();

  const [application, setApplication] = useState(null);

  const fetchApplication = async () => {
    try {

      const res = await axios.get(
        `/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setApplication(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) fetchApplication();
  }, [id]);

  if (!application) return <p>Loading...</p>;

  return (

   <div style={{
  padding: "30px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "white"
}}>
    <div style={{
  maxWidth: "700px",
  margin: "0 auto",
  background: "#020617",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
}}></div>

    <h2 style={{
  marginBottom: "20px",
  fontSize: "24px",
  borderBottom: "1px solid #334155",
  paddingBottom: "10px"
}}>
  Application Details
</h2>

   <p style={{ marginBottom: "8px" }}>
  <strong>Company:</strong> {application.companyId?.name}
</p>
      <p><strong>Role:</strong> {application.role}</p>
      <p><strong>Status:</strong> {application.status}</p>

      <h3 style={{
  marginTop: "25px",
  marginBottom: "10px",
  color: "#38bdf8"
  
}}>
  Timeline
</h3>

      <div style={{ position: "relative", marginTop: "20px" }}>

        {/* vertical line */}
        <div style={{
          position: "absolute",
          left: "15px",
          top: 0,
          bottom: 0,
          width: "2px",
          background: "#334155"
          
        }} />

        {application.history?.length > 0 ? (

          application.history.map((item, index) => {

            const colors = {
              Applied: "#2563eb",
              Interview: "#f59e0b",
              Offer: "#10b981",
              Rejected: "#ef4444"
            };

            return (
              <div key={index} style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
                position: "relative"
              }}>

                {/* circle */}
                <div style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: colors[item.status] || "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  zIndex: 1
                }}>
                  ✓
                </div>

                {/* content */}
                <div style={{
                  marginLeft: "15px",
                  background: "#1e293b",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  minWidth: "200px"
                }}>

                  <div style={{ fontWeight: "bold" }}>
                    {item.status}
                  </div>

                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </div>

                </div>

              </div>
            );
          })

        ) : (

          <p>No timeline available</p>

        )}

      </div>

    </div>

  );
};

export default ApplicationDetails;