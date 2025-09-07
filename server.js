// ---------------- Load environment variables ----------------
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") }); // ensure .env is loaded

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ---------------- Config ----------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGO_URI) {
  console.error(" MONGO_URI is missing in .env");
  process.exit(1);
}
if (!JWT_SECRET) {
  console.error(" JWT_SECRET is missing in .env");
  process.exit(1);
}

console.log("Loaded MONGO_URI:", MONGO_URI);

// ---------------- Mongoose Models ----------------
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number
});

const cartSchema = new mongoose.Schema({
  email: String,
  items: [mongoose.Schema.Types.ObjectId] // store item IDs
});

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);
const Cart = mongoose.model("Cart", cartSchema);

// ---------------- Connect to MongoDB ----------------
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ---------------- Middleware ----------------
function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ---------------- Routes ----------------

// Signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const user = new User({ email, password });
    await user.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- Items CRUD ----------------
app.post("/items", auth, async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

app.get("/items", async (req, res) => {
  let query = {};
  if (req.query.category) query.category = req.query.category;
  if (req.query.price) query.price = { $lte: Number(req.query.price) };

  const items = await Item.find(query);
  res.json(items);
});

app.put("/items/:id", auth, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.delete("/items/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

// ---------------- Cart ----------------
app.post("/cart/add", auth, async (req, res) => {
  const email = req.user.email;
  let cart = await Cart.findOne({ email });
  if (!cart) cart = new Cart({ email, items: [] });

  cart.items.push(req.body.itemId);
  await cart.save();
  res.json(cart.items);
});

app.delete("/cart/remove/:id", auth, async (req, res) => {
  const email = req.user.email;
  const cart = await Cart.findOne({ email });
  if (!cart) return res.json([]);

  cart.items = cart.items.filter(id => id.toString() !== req.params.id);
  await cart.save();
  res.json(cart.items);
});

app.get("/cart", auth, async (req, res) => {
  const email = req.user.email;
  const cart = await Cart.findOne({ email });
  if (!cart) return res.json([]);

  const items = await Item.find({ _id: { $in: cart.items } });
  res.json(items);
});

// ---------------- Serve React Frontend ----------------
const buildPath = path.join(__dirname, "frontend/build");
app.use(express.static(buildPath));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ---------------- Start Server ----------------
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
