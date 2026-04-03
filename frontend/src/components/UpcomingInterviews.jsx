import { useEffect, useState } from "react";
import axios from "axios";

const UpcomingInterviews = () => {

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchInterviews = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/upcoming-interviews",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setInterviews(res.data);

      } catch (err) {
        console.error("Failed to fetch interviews", err);
      } finally {
        setLoading(false);
      }

    };

    fetchInterviews();

  }, []);

  if (loading) {
    return (
      <div style={card}>
        <h3>Upcoming Interviews</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={card}>

      <h3 style={{ marginBottom: "20px" }}>
        Upcoming Interviews
      </h3>

      {interviews.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No interviews scheduled</p>
      ) : (

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>

          {interviews.map((interview, index) => {

            const formattedDate = new Date(interview.date).toLocaleDateString(
              "en-IN",
              { day: "numeric", month: "short" }
            );

            return (
              <li
                key={index}
                style={item}
              >

                <div>
                  <strong>{interview.companyName}</strong>
                  <div style={{ fontSize: "14px", opacity: 0.8 }}>
                    {interview.role}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={badge}>
                    {interview.roundName}
                  </span>
                  <div style={{ fontSize: "13px", marginTop: "4px" }}>
                    {formattedDate}
                  </div>
                </div>

              </li>
            );

          })}

        </ul>

      )}

    </div>
  );
};

/* styles */

const card = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "10px",
  marginBottom: "40px"
};

const item = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #1e293b"
};

const badge = {
  background: "#2563eb",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

export default UpcomingInterviews;