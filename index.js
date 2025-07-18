const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

// Load env variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust as needed)
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // HTTP request logger

// Routes import
const usersRouter = require("./routes/users");
const animesRouter = require("./routes/animes");
const mangasRouter = require("./routes/mangas");

// Pass supabase client to routes via req object middleware (optional)
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Use routes
app.use("/mangas", mangasRouter);

app.use("/users", usersRouter);
app.use("/animes", animesRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to AniMon API");
});

// Global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
