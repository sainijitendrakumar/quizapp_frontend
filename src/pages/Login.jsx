import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // 🆕 Import Link

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://quizapp-production-c985.up.railway.app/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMsg("Login successful!");
      console.log("User logged in:", res.data.user);

      // Redirect to quiz page
      window.location.href = "/quiz";
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMsg(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        marginTop: "60px",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "10px",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      <p
        style={{
          marginTop: "15px",
          color: msg.includes("success") ? "green" : "red",
        }}
      >
        {msg}
      </p>

      {/* 🆕 Clickable link to Register page */}
      <p style={{ marginTop: "10px" }}>
        If you don’t have an account,{" "}
        <Link
          to="/register"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          Register here
        </Link>
        .
      </p>
    </div>
  );
};

export default Login;
