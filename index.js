const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const usersRouter = require("./routes/users");
const animesRouter = require("./routes/animes");
const mangasRouter = require("./routes/mangas");
const libraryRouter = require("./routes/library");
const groupsRouter = require("./routes/groups");


const { createUserService } = require("./services/userService");
const userService = createUserService(supabase);


app.use("/users", usersRouter(userService));
app.use("/animes", animesRouter);
app.use("/mangas", mangasRouter);
app.use("/api/library", libraryRouter);
app.use("/api/groups", groupsRouter);


app.get("/", (req, res) => {
  res.send("Welcome to AniMon API");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});