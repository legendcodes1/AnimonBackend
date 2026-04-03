import express, { type Request, type Response, type NextFunction } from 'express';
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bigRouter from "./routes/indexsRouter.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



app.use("/api", bigRouter)


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