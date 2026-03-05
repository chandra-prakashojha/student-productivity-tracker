import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";
import { getRecentApplications } from "../api/applicationApi";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const Dashboard = () => {

  const [stats,setStats] = useState({
    students:0,
    applications:0,
    interviews:0,
    offers:0,
    rejected:0
  });

  const [recentApps,setRecentApps] = useState([]);

  useEffect(()=>{

    const loadData = async () => {

      try{

        const statsData = await getDashboardStats();
        if(statsData) setStats(statsData);

      }catch(err){
        console.log("Stats error",err);
      }

      try{

        const recentData = await getRecentApplications();
        if(Array.isArray(recentData)){
          setRecentApps(recentData);
        }

      }catch(err){
        console.log("Recent apps error",err);
      }

    };

    loadData();

  },[]);

  const chartData = [

    { name:"Applied", value:stats.applications || 0 },
    { name:"Interview", value:stats.interviews || 0 },
    { name:"Offer", value:stats.offers || 0 },
    { name:"Rejected", value:stats.rejected || 0 }

  ];

  const COLORS = ["#2563eb","#f59e0b","#10b981","#ef4444"];

  return(

    <DashboardLayout>

      <h1 style={{marginBottom:"30px"}}>Dashboard</h1>

      {/* Stats Cards */}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        gap:"20px",
        marginBottom:"40px"
      }}>

        <div style={card}>
          <h3>Total Students</h3>
          <p>{stats.students}</p>
        </div>

        <div style={card}>
          <h3>Total Applications</h3>
          <p>{stats.applications}</p>
        </div>

        <div style={card}>
          <h3>Interviews</h3>
          <p>{stats.interviews}</p>
        </div>

        <div style={card}>
          <h3>Offers</h3>
          <p>{stats.offers}</p>
        </div>

      </div>

      {/* Chart */}

      <div style={{
        background:"#0f172a",
        padding:"30px",
        borderRadius:"10px",
        width:"500px"
      }}>

        <h3 style={{marginBottom:"20px"}}>Application Status</h3>

        <PieChart width={400} height={300}>

          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >

            {chartData.map((entry,index)=>(
              <Cell key={index} fill={COLORS[index]} />
            ))}

          </Pie>

          <Tooltip/>
          <Legend/>

        </PieChart>

      </div>


      {/* Recent Applications */}

      <div style={{
        marginTop:"40px",
        background:"#0f172a",
        padding:"25px",
        borderRadius:"10px",
        width:"500px"
      }}>

        <h3 style={{marginBottom:"20px"}}>Recent Applications</h3>

        <table style={{width:"100%",color:"white"}}>

          <thead>

            <tr>
              <th align="left">Company</th>
              <th align="left">Role</th>
              <th align="left">Status</th>
            </tr>

          </thead>

          <tbody>

            {recentApps.length === 0 ? (

              <tr>
                <td colSpan="3">No recent applications</td>
              </tr>

            ) : (

              recentApps.map(app => (

                <tr key={app._id}>
                  <td>{app.company}</td>
                  <td>{app.role}</td>
                  <td>{app.status}</td>
                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>

  );

};

const card = {

  background:"#0f172a",
  padding:"25px",
  borderRadius:"10px",
  textAlign:"center"

};

export default Dashboard;