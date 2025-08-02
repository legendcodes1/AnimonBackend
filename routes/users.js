// users.js (Express router)
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Load environment variables
require("dotenv").config();

// Get all users (for testing/debugging; be careful exposing this in production)
router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await req.supabase.from("User").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Update user info (not hashing password here, but you can add that similarly)
router.put("/:id", async (req, res, next) => {
  const { Username, Password, Email } = req.body;
  const { id } = req.params;

  try {
    // If password provided, hash it before update
    let updateData = { Username, Email };
    if (Password) {
      const hashedPassword = await bcrypt.hash(Password, 10);
      updateData.Password = hashedPassword;
    }

    const { data, error } = await req.supabase
      .from("User")
      .update(updateData)
      .eq("id", id)
      .select("*");

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// Register new user (hash password before saving)
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "username, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await req.supabase
      .from("User")
      .insert([{ Username: username, Password: hashedPassword, Email: email }])
      .select("*");

    if (error) throw error;

    res.status(201).json({ message: "User registered", user: data[0] });
  } catch (error) {
    next(error);
  }
});

// Login user: verify email and password, then create JWT token
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("User")
      .select("*")
      .eq("Email", email) // Supabase column 'Email' probably capitalized, keep as is here
      .single();

    if (error || !data) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, data.Password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: data.id, email: data.Email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// Middleware to authenticate JWT token for protected routes
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get logged-in user info
router.get("/me", authenticate, async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("User")
      .select("id, Username, Email")
      .eq("id", req.user.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user info" });
  }
});

// Delete user by id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data, error } = await req.supabase
      .from("User")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
