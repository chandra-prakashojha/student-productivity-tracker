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
<div style={skeletonCard}/>
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

<h1 style={{marginBottom:"30px"}}>Dashboard</h1>

<div style={{marginBottom:"40px"}}>
<h2>Resume Analyzer</h2>
<ResumeAnalyzer />
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
style={card}
>
<h3 style={cardTitle}><Users size={18}/> Total Students</h3>
<p><CountUp end={stats.students} duration={1.2}/></p>
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
style={card}
>
<h3 style={cardTitle}><Briefcase size={18}/> Total Applications</h3>
<p><CountUp end={stats.applications} duration={1.2}/></p>
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
style={card}
>
<h3 style={cardTitle}><Calendar size={18}/> Interviews</h3>
<p><CountUp end={stats.interviews} duration={1.2}/></p>
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
style={card}
>
<h3 style={cardTitle}><Trophy size={18}/> Offers</h3>
<p><CountUp end={stats.offers} duration={1.2}/></p>
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
style={card}
>
<h3 style={cardTitle}><TrendingUp size={18}/> Offer Rate</h3>
<p><CountUp end={successRate} duration={1.2}/> %</p>
</motion.div>

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

<InterviewCalendar />

<div>
<UpcomingInterviews/>
</div>

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
background:"#0f172a",
padding:"25px",
borderRadius:"10px",
textAlign:"center"
};

const cardTitle={
display:"flex",
alignItems:"center",
justifyContent:"center",
gap:"8px"
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