import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log("SENDING DATA:", form);

      const res = await registerUser(form);

      // Save token for auto login
      localStorage.setItem("token", res.data.token);

      alert("Registration successful");

      // Go directly to dashboard
      navigate("/dashboard");

    } catch (err) {

      console.log(err.response);

      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>

      </form>

    </div>
  );
};

export default Register;