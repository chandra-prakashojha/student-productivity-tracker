import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Login = () => {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login",form);

      localStorage.setItem("token",res.data.token);

      navigate("/dashboard");

    } catch(err) {

      alert(err.response?.data?.message || "Invalid credentials");

    }

  };

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={title}>Placement Tracker</h1>

        <p style={subtitle}>
          Track applications, interviews and job offers
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={input}
            required
          />

          <button style={button}>
            Login
          </button>

        </form>

        <p style={registerText}>
          Don't have an account?{" "}
          <Link to="/register" style={registerLink}>
            Register
          </Link>
        </p>

      </div>

    </div>

  );

};

const container = {
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"linear-gradient(135deg,#020617,#0f172a)"
};

const card = {
  width:"400px",
  padding:"40px",
  borderRadius:"12px",
  background:"#0f172a",
  boxShadow:"0 10px 40px rgba(0,0,0,0.5)"
};

const title = {
  textAlign:"center",
  marginBottom:"10px"
};

const subtitle = {
  textAlign:"center",
  fontSize:"14px",
  marginBottom:"30px",
  color:"#94a3b8"
};

const input = {
  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  borderRadius:"6px",
  border:"1px solid #334155",
  background:"#020617",
  color:"white"
};

const button = {
  width:"100%",
  padding:"12px",
  background:"#6366f1",
  border:"none",
  borderRadius:"6px",
  color:"white",
  fontWeight:"bold",
  cursor:"pointer"
};

const registerText = {
  textAlign:"center",
  marginTop:"20px"
};

const registerLink = {
  color:"#6366f1",
  textDecoration:"none"
};

export default Login;