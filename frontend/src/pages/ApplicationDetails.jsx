import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApplicationDetails = () => {

  const { id } = useParams();

  const [application, setApplication] = useState(null);

  const [roundName, setRoundName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

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

  const handleAddRound = async () => {

    try {

      await axios.post(
        `/api/applications/${id}/interview-round`,
        {
          roundName,
          date,
          notes
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setRoundName("");
      setDate("");
      setNotes("");

      fetchApplication();

    } catch (err) {
      console.log(err);
    }
  };

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
}}>

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

      {/* Interview Rounds Section */}

      <h3 style={{
        marginTop: "40px",
        marginBottom: "10px",
        color: "#38bdf8"
      }}>
        Interview Rounds
      </h3>

      <div style={{
        background: "#1e293b",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>

        <input
          placeholder="Round Name (Technical / HR)"
          value={roundName}
          onChange={(e)=>setRoundName(e.target.value)}
          style={{
            width:"100%",
            marginBottom:"10px",
            padding:"8px",
            borderRadius:"6px",
            border:"none"
          }}
        />

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          style={{
            width:"100%",
            marginBottom:"10px",
            padding:"8px",
            borderRadius:"6px",
            border:"none"
          }}
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
          style={{
            width:"100%",
            marginBottom:"10px",
            padding:"8px",
            borderRadius:"6px",
            border:"none"
          }}
        />

        <button
          onClick={handleAddRound}
          style={{
            background:"#38bdf8",
            border:"none",
            padding:"10px 15px",
            borderRadius:"6px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
        >
          Add Interview Round
        </button>

      </div>

      {/* Show Existing Rounds */}

      {application.interviewRounds?.length > 0 ? (

        application.interviewRounds.map((round,index)=>(
          <div key={index} style={{
            border:"1px solid #334155",
            padding:"12px",
            borderRadius:"8px",
            marginBottom:"10px",
            background:"#020617"
          }}>

            <strong>{round.roundName}</strong>

            <p style={{fontSize:"13px",color:"#94a3b8"}}>
              {new Date(round.date).toLocaleDateString()}
            </p>

            <p>Status: {round.status}</p>

            <p>{round.notes}</p>

          </div>
        ))

      ) : (

        <p style={{color:"#94a3b8"}}>No interview rounds added yet</p>

      )}

    </div>

  </div>

  );
};

export default ApplicationDetails;