import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const background = "https://wallpapercave.com/wp/wp3628276.jpg";

  const categories = [
    { name: "Electronics", img: "https://images.unsplash.com/photo-1639026540100-045bb7632b0b?auto=format&fit=crop&w=500&q=80" },
    { name: "Fashion", img: "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?auto=format&fit=crop&w=500&q=80" },
    { name: "Home", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80" },
    { name: "Books", img: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&w=500&q=80" },
  ];

  const featuredProducts = [
    { name: "Product 1", price: 20, img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" },
    { name: "Product 2", price: 30, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=300&q=80" },
    { name: "Product 3", price: 40, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}>
        <h2 style={{ fontSize: "28px", color: "#ffcc00" }}>E-Commerce SPA</h2>
        <div>
          <Link to="/signup">
            <button style={{
              marginRight: 15,
              padding: "14px 28px",
              fontSize: "18px",
              background: "#ff6600",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              cursor: "pointer"
            }}>Signup</button>
          </Link>
          <Link to="/login">
            <button style={{
              padding: "14px 28px",
              fontSize: "18px",
              background: "#ff6600",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              cursor: "pointer"
            }}>Login</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ padding: "50px 20px" }}>
        <h1>Welcome to E-Commerce SPA</h1>
        <p>Discover amazing products at great prices.</p>
      </div>

      {/* Categories */}
      <h2 style={{ marginTop: 40 }}>Shop by Category</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
        {categories.map((c, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <img src={c.img} alt={c.name} style={{ width: 250, height: 250, borderRadius: 10 }} />
            <p style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>{c.name}</p>
          </div>
        ))}
      </div>

      {/* Small Info Section */}
      <div style={{
        marginTop: 30,
        padding: 20,
        maxWidth: 800,
        marginLeft: "auto",
        marginRight: "auto",
        color: "#fff",
        lineHeight: 1.6,
      }}>
        <h3>Why Explore Our Categories?</h3>
        <p>
          Browse electronics for the latest gadgets, fashion for trendy styles, 
          home for stylish decor, and books for knowledge and entertainment. 
          Enjoy secure payments, fast shipping, and excellent customer support!
        </p>
      </div>

      {/* Featured Products */}
      <h2 style={{ marginTop: 40 }}>Featured Products</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
        {featuredProducts.map((p, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <img src={p.img} alt={p.name} style={{ width: 200, height: 200, borderRadius: 10 }} />
            <p>{p.name}</p>
            <p>$ {p.price}</p>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div style={{ marginTop: 40, padding: 20, borderRadius: 10 }}>
        <h3>Why Shop With Us?</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>• Secure Payments</li>
          <li>• Fast Delivery</li>
          <li>• 24/7 Customer Support</li>
          <li>• Easy Returns</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
