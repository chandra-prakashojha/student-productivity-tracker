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
    fetchApplication();
  }, []);

  if (!application) return <p>Loading...</p>;

  return (

    <div style={{ padding: "30px", color: "white" }}>

      <h2>Application Details</h2>

      <p><strong>Company:</strong> {application.companyId?.name}</p>
      <p><strong>Role:</strong> {application.role}</p>
      <p><strong>Status:</strong> {application.status}</p>

      <h3 style={{ marginTop: "20px" }}>Timeline</h3>

      <div>

        {application.history.map((item, index) => (

          <div key={index} style={{
            padding: "10px",
            marginBottom: "10px",
            background: "#1e293b",
            borderRadius: "6px"
          }}>

            <strong>{item.status}</strong>
            <br />
            <small>
              {new Date(item.date).toLocaleDateString()}
            </small>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ApplicationDetails;