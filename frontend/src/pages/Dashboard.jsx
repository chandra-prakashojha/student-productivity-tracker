import { useEffect, useState, useContext } from "react";
import {
  getDashboardStats,
  getApplicationTrend
} from "../api/dashboardApi";
import { getRecentApplications } from "../api/applicationApi";
import UpcomingInterviews from "../components/UpcomingInterviews";
import DashboardLayout from "../layouts/DashboardLayout";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import { AppContext } from "../context/AppContext";
import InterviewCalendar from "../components/InterviewCalendar";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, Briefcase, Calendar, Trophy, TrendingUp } from "lucide-react";

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

const successRate =
stats.applications === 0
? 0
: Math.round((stats.offers / stats.applications) * 100);

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

if(loading){

return(

<DashboardLayout>

<h1 style={{marginBottom:"30px"}}>Dashboard</h1>

<div style={statsGrid}>
<div className="dashboard-card" style={skeletonCard}></div>
<div className="dashboard-card" style={skeletonCard}></div>
<div className="dashboard-card" style={skeletonCard}></div>
<div className="dashboard-card" style={skeletonCard}></div>
<div className="dashboard-card" style={skeletonCard}></div>
</div>

<div style={chartGrid}>
<div className="chart-container" style={skeletonChart}></div>
<div className="chart-container" style={skeletonChart}></div>
</div>

</DashboardLayout>

);

}

return(

<DashboardLayout>

<h1 style={{marginBottom:"30px"}}>Dashboard</h1>

<div style={{marginBottom:"50px"}}>

<h2 style={{
fontSize:"22px",
marginBottom:"15px",
color:"#e2e8f0"
}}>
Resume Analyzer
</h2>

<div style={{
background:"linear-gradient(135deg, rgba(59,130,246,0.15), rgba(16,185,129,0.15))",
border:"1px solid rgba(255,255,255,0.08)",
borderRadius:"18px",
padding:"30px",
boxShadow:"0 20px 50px rgba(0,0,0,0.6)",
backdropFilter:"blur(18px)"
}}>

<ResumeAnalyzer />

</div>

</div>

{/* Stats Cards */}

<div style={statsGrid}>

<motion.div
initial={{ opacity:0, y:30 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.5 }}
whileHover={{
scale:1.05,
y:-6,
boxShadow:"0px 12px 35px rgba(59,130,246,0.35)"
}}
className="dashboard-card card-purple"
style={card}
>
<h3 style={cardTitle}><Users size={18}/> Total Students</h3>
<p className="card-value"><CountUp end={stats.students} duration={1.2}/></p>
</motion.div>

<motion.div
initial={{ opacity:0, y:30 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.6 }}
whileHover={{
scale:1.05,
y:-6,
boxShadow:"0px 12px 35px rgba(59,130,246,0.35)"
}}
className="dashboard-card card-blue"
style={card}
>
<h3 style={cardTitle}><Briefcase size={18}/> Total Applications</h3>
<p className="card-value"><CountUp end={stats.applications} duration={1.2}/></p>
</motion.div>

<motion.div
initial={{ opacity:0, y:30 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.7 }}
whileHover={{
scale:1.05,
y:-6,
boxShadow:"0px 12px 35px rgba(59,130,246,0.35)"
}}
className="dashboard-card card-yellow"
style={card}
>
<h3 style={cardTitle}><Calendar size={18}/> Interviews</h3>
<p className="card-value"><CountUp end={stats.interviews} duration={1.2}/></p>
</motion.div>

<motion.div
initial={{ opacity:0, y:30 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.8 }}
whileHover={{
scale:1.05,
y:-6,
boxShadow:"0px 12px 35px rgba(59,130,246,0.35)"
}}
className="dashboard-card card-green"
style={card}
>
<h3 style={cardTitle}><Trophy size={18}/> Offers</h3>
<p className="card-value"><CountUp end={stats.offers} duration={1.2}/></p>
</motion.div>

<motion.div
initial={{ opacity:0, y:30 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.9 }}
whileHover={{
scale:1.05,
y:-6,
boxShadow:"0px 12px 35px rgba(59,130,246,0.35)"
}}
className="dashboard-card card-pink"
style={card}
>
<h3 style={cardTitle}><TrendingUp size={18}/> Offer Rate</h3>
<p className="card-value"><CountUp end={successRate} duration={1.2}/> %</p>
</motion.div>

</div>

{/* Charts */}

<div style={chartGrid}>

<div className="chart-container" style={chartCard}>

<h3 className="chart-title" style={{marginBottom:"20px"}}>
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

<div className="chart-container" style={chartCard}>

<h3 className="chart-title" style={{marginBottom:"20px"}}>
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

<InterviewCalendar />

<div>
<UpcomingInterviews/>
</div>

<div style={recentCard}>

<h3
style={{
marginBottom:"20px",
color:"white",
fontSize:"22px"
}}
>
Recent Applications
</h3>

<div
style={{
display:"flex",
flexDirection:"column",
gap:"16px"
}}
>

{recentApps.length===0 ? (

<div
style={{
padding:"30px",
borderRadius:"16px",
background:"rgba(255,255,255,0.03)",
border:"1px dashed rgba(255,255,255,0.1)",
textAlign:"center",
color:"#94a3b8"
}}
>
No recent applications
</div>

) : (

recentApps.map((app)=>{

const statusColors={
Applied:"#3b82f6",
Interview:"#10b981",
Rejected:"#ef4444"
};

return(

<motion.div
key={app._id}
whileHover={{
scale:1.01,
y:-3
}}
style={{
background:"rgba(255,255,255,0.03)",
border:"1px solid rgba(255,255,255,0.06)",
padding:"18px",
borderRadius:"16px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
transition:"0.2s"
}}
>

<div>

<h4
style={{
margin:0,
color:"white",
fontSize:"17px"
}}
>
{
typeof app.companyId === "object"
? app.companyId.name
: "Unknown Company"
}
</h4>

<p
style={{
marginTop:"6px",
marginBottom:0,
color:"#94a3b8"
}}
>
{app.role}
</p>

</div>

<div
style={{
padding:"8px 14px",
borderRadius:"999px",
background:`${statusColors[app.status]}20`,
color:statusColors[app.status],
fontWeight:"600",
fontSize:"14px"
}}
>
{app.status}
</div>

</motion.div>

);

})

)}

</div>

</div>

</DashboardLayout>

);

};

const statsGrid={
display:"grid",
gridTemplateColumns:"repeat(5,1fr)",
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
background:"linear-gradient(145deg, #0f172a, #020617)",
padding:"25px",
borderRadius:"16px",
textAlign:"center",
border:"1px solid rgba(99,102,241,0.15)",
boxShadow:"0 10px 25px rgba(0,0,0,0.6)",
transition:"all 0.25s ease"
};

const cardTitle={
display:"flex",
alignItems:"center",
justifyContent:"center",
gap:"8px"
};

const chartCard={
background:"#020617",
padding:"25px",
borderRadius:"18px",
border:"1px solid rgba(255,255,255,0.05)",
boxShadow:"0 15px 35px rgba(0,0,0,0.7)"
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