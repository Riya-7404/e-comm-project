// src/pages/Signup.js
import React, { useState } from "react";
import background from "../assets/pic2.jpg"; // replace with your image
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert("Signup successful!");
        navigate("/info"); // redirect to info page
      } else {
        const data = await res.json();
        alert(data || "Signup failed");
      }
    } catch (err) {
      alert("Error signing up");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <form onSubmit={handleSignup} style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 30,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        width: 300,
        color: "#fff",
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: 15, padding: 10, borderRadius: 5, border: "none" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: 15, padding: 10, borderRadius: 5, border: "none" }}
        />
        <button style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: "#ff6600",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
        }}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
