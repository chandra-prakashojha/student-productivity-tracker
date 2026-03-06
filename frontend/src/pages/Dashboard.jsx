import { useEffect, useState, useContext } from "react";
import {
  getDashboardStats,
  getApplicationTrend
} from "../api/dashboardApi";
import { getRecentApplications } from "../api/applicationApi";

import DashboardLayout from "../layouts/DashboardLayout";
import { AppContext } from "../context/AppContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const Dashboard = () => {

  const { refreshDashboard } = useContext(AppContext);

  const [stats,setStats] = useState({
    students:0,
    applications:0,
    interviews:0,
    offers:0,
    rejected:0
  });

  const [recentApps,setRecentApps] = useState([]);
  const [trend,setTrend] = useState([]);

  const [loading,setLoading] = useState(true);



  const fetchStats = async () => {

    try{
      const data = await getDashboardStats();
      setStats(data);
    }catch(err){
      console.log(err);
    }

  };


  const fetchRecentApps = async () => {

    try{
      const data = await getRecentApplications();
      setRecentApps(data);
    }catch(err){
      console.log(err);
    }

  };


  const fetchTrend = async () => {

    try{
      const data = await getApplicationTrend();
      setTrend(data);
    }catch(err){
      console.log(err);
    }

  };



  useEffect(()=>{

    const loadDashboard = async () => {

      setLoading(true);

      await Promise.all([
        fetchStats(),
        fetchRecentApps(),
        fetchTrend()
      ]);

      setLoading(false);

    };

    loadDashboard();

  },[refreshDashboard]);



  const chartData=[

    { name:"Applied", value:stats.applications },
    { name:"Interview", value:stats.interviews },
    { name:"Offer", value:stats.offers },
    { name:"Rejected", value:stats.rejected }

  ];


  const COLORS=[
    "#2563eb",
    "#f59e0b",
    "#10b981",
    "#ef4444"
  ];



  /* LOADING SKELETON */

  if(loading){

    return(

      <DashboardLayout>

        <h1 style={{marginBottom:"30px"}}>
          Dashboard
        </h1>

        <div style={statsGrid}>
          <div style={skeletonCard}/>
          <div style={skeletonCard}/>
          <div style={skeletonCard}/>
          <div style={skeletonCard}/>
        </div>

        <div style={chartGrid}>
          <div style={skeletonChart}/>
          <div style={skeletonChart}/>
        </div>

      </DashboardLayout>

    );

  }



  return(

    <DashboardLayout>

      <h1 style={{marginBottom:"30px"}}>
        Dashboard
      </h1>



      {/* Stats Cards */}

      <div style={statsGrid}>

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



      {/* Charts */}

      <div style={chartGrid}>

        <div style={chartCard}>

          <h3 style={{marginBottom:"20px"}}>
            Application Status
          </h3>

          <PieChart width={350} height={260}>

            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
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



        <div style={chartCard}>

          <h3 style={{marginBottom:"20px"}}>
            Application Trend
          </h3>

          <LineChart width={400} height={260} data={trend}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>

            <Line
              type="monotone"
              dataKey="applications"
              stroke="#3b82f6"
              strokeWidth={3}
            />

          </LineChart>

        </div>

      </div>



      {/* Recent Applications */}

      <div style={recentCard}>

        <h3 style={{marginBottom:"20px"}}>
          Recent Applications
        </h3>

        <table style={{width:"100%",color:"white"}}>

          <thead>

            <tr>
              <th align="left">Company</th>
              <th align="left">Role</th>
              <th align="left">Status</th>
            </tr>

          </thead>

          <tbody>

            {recentApps.length===0?(
              <tr>
                <td colSpan="3">
                  No recent applications
                </td>
              </tr>
            ):(
              recentApps.map(app=>(
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



/* STYLES */

const statsGrid={
  display:"grid",
  gridTemplateColumns:"repeat(4,1fr)",
  gap:"20px",
  marginBottom:"40px"
};

const chartGrid={
  display:"grid",
  gridTemplateColumns:"1fr 1fr",
  gap:"20px",
  marginBottom:"40px"
};

const card={
  background:"#0f172a",
  padding:"25px",
  borderRadius:"10px",
  textAlign:"center"
};

const chartCard={
  background:"#0f172a",
  padding:"25px",
  borderRadius:"10px"
};

const recentCard={
  background:"#0f172a",
  padding:"25px",
  borderRadius:"10px"
};

const skeletonCard={
  background:"#0f172a",
  height:"90px",
  borderRadius:"10px",
  opacity:0.6
};

const skeletonChart={
  background:"#0f172a",
  height:"300px",
  borderRadius:"10px",
  opacity:0.6
};

export default Dashboard;