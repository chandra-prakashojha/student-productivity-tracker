import { useState } from "react";
import axios from "axios";

const Register = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
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
      await axios.post("/api/auth/register", form);
      alert("Registered Successfully");
    } catch (err) {
      console.log(err);
      alert("Error registering user");
    }
  };

  return (

    <form onSubmit={handleSubmit} style={formContainer}>

      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Create Account
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        style={input}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
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

      <button type="submit" style={button}>
        Create Account
      </button>

    </form>
  );
};


/* 🔥 STYLES */

const formContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
  outline: "none"
};

const button = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #2563eb, #6366f1)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};

export default Register;