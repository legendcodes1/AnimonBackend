import express, { type Request, type Response, type NextFunction } from 'express';
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import {createClient} from "@supabase/supabase-js";
import { userService } from "./services/userServices.js";
import { userController } from "./controllers/userController.js";
import { clubsController } from './controllers/clubsController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// const usersRouter = require("./routes/users");
// const animesRouter = require("./routes/animes");
// const mangasRouter = require("./routes/mangas");
// const libraryRouter = require("./routes/library");
// const groupsRouter = require("./routes/groups");


const userServiceInstance = userService(supabase);
const usersRouter = userController(userServiceInstance);

app.use("/users", usersRouter);
// app.use("/animes", animesRouter);
// app.use("/mangas", mangasRouter);
// app.use("/api/library", libraryRouter);
// app.use("/api/groups", groupsRouter);


app.get("/", (req, res) => {
  res.send("Welcome to AniMon API");
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});