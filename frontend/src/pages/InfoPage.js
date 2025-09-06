import React from "react";
import { Link } from "react-router-dom";
import background from "../assets/background.jpg";
import featured1 from "../assets/item1.jpg"; // placeholders
import featured2 from "../assets/item2.jpg";
import featured3 from "../assets/item3.jpg";

const InfoPage = () => {
  const userEmail = "user@example.com"; // You can replace with real user email later

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Welcome Section */}
      <div style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: 20, borderRadius: 10, textAlign: "center" }}>
        <h1>Welcome, {userEmail}!</h1>
        <p>Discover amazing products and deals just for you!</p>
      </div>

      {/* Featured Products */}
      <h2 style={{ marginTop: 30 }}>Featured Products</h2>
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {[featured1, featured2, featured3].map((img, idx) => (
          <div key={idx} style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: 10, borderRadius: 10, textAlign: "center" }}>
            <img src={img} alt={`Product ${idx + 1}`} style={{ width: 150, height: 150, borderRadius: 10 }} />
            <p>Product {idx + 1}</p>
            <p>$ {20 + idx * 10}</p>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div style={{ marginTop: 30, backgroundColor: "rgba(0,0,0,0.6)", padding: 20, borderRadius: 10 }}>
        <h3>Why Shop With Us?</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>• Secure Payments</li>
          <li>• Fast Delivery</li>
          <li>• 24/7 Customer Support</li>
          <li>• Easy Returns</li>
        </ul>
      </div>

      {/* Call-to-Action Buttons */}
      <div style={{ marginTop: 20 }}>
        <Link to="/">
          <button style={{ marginRight: 10, padding: "10px 20px", borderRadius: 5, border: "none", backgroundColor: "#ff6600", color: "#fff" }}>
            View Listings
          </button>
        </Link>
        <Link to="/cart">
          <button style={{ padding: "10px 20px", borderRadius: 5, border: "none", backgroundColor: "#ff6600", color: "#fff" }}>
            Go to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InfoPage;
