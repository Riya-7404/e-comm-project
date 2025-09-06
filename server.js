const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

// Enable CORS (for development, allow frontend to call backend)
app.use(cors());

const SECRET = "secret123";

// In-memory DB (reset when server restarts)
let users = [];
let items = [];
let carts = {};

// ---------------- AUTH ----------------
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }
  users.push({ email, password });
  res.json({ message: "Signup successful" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// ---------------- Middleware ----------------
function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ---------------- ITEMS CRUD ----------------
app.post("/items", auth, (req, res) => {
  const item = { id: items.length + 1, ...req.body };
  items.push(item);
  res.json(item);
});

app.get("/items", (req, res) => {
  let result = [...items];
  if (req.query.category) result = result.filter(i => i.category === req.query.category);
  if (req.query.price) result = result.filter(i => i.price <= Number(req.query.price));
  res.json(result);
});

app.put("/items/:id", auth, (req, res) => {
  const id = +req.params.id;
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  Object.assign(item, req.body);
  res.json(item);
});

app.delete("/items/:id", auth, (req, res) => {
  items = items.filter(i => i.id !== +req.params.id);
  res.json({ message: "Item deleted" });
});

// ---------------- CART ----------------
app.post("/cart/add", auth, (req, res) => {
  const email = req.user.email;
  if (!carts[email]) carts[email] = [];
  carts[email].push(req.body.itemId);
  res.json(carts[email]);
});

app.delete("/cart/remove/:id", auth, (req, res) => {
  const email = req.user.email;
  carts[email] = (carts[email] || []).filter(id => id !== +req.params.id);
  res.json(carts[email]);
});

app.get("/cart", auth, (req, res) => {
  const email = req.user.email;
  const cartItems = (carts[email] || []).map(id => items.find(i => i.id === id));
  res.json(cartItems);
});

// ---------------- Serve Frontend ----------------
const buildPath = path.join(__dirname, "frontend/build");
app.use(express.static(buildPath));


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ---------------- Start server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
