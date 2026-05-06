import { useState } from "react";
import API from "../api/axios";

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

      const res = await API.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registered Successfully");

    } catch (err) {

      console.log(err);

      alert(err.response?.data?.message || "Registration failed");

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