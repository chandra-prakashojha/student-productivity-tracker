import { useEffect, useState } from "react";
import axios from "axios";

const CompanyAnalytics = () => {

  const [data, setData] = useState([]);

  const fetchAnalytics = async () => {
    try {

      const res = await axios.get(
        "/api/applications/analytics/company",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setData(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (

    <div style={{
      padding: "30px",
      minHeight: "100vh",
      background: "#020617",
      color: "white"
    }}>

      <h2>📊 Company Analytics</h2>

      <table style={{ width: "100%", marginTop: "20px" }}>

        <thead>
          <tr>
            <th align="left">Company</th>
            <th align="left">Applications</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item, index) => (

            <tr key={index}>
              <td>{item.companyName}</td>
              <td>{item.totalApplications}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default CompanyAnalytics;