import { Router } from "express"
// import verifyToken from "../middlewares/auth";
import { libraryController } from "../controllers/libraryController";


const router = Router()
const controller = libraryController()
// ---------------- GET ALL GROUPS FOR USER ----------------
router.get("/", 
  controller.getLibrary
);

// ---------------- CREATE A NEW GROUP ----------------


export default router;