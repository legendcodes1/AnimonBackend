import { Router } from "express"
import {clubsController} from "../controllers/clubsController"


const router = Router()
const controller = clubsController()
// ---------------- GET ALL GROUPS FOR USER ----------------
router.get("/", 
  controller.getClubs
);

// GET SINGLE CLUB BY ID
router.get("/:id", 
  controller.getClubById
);
// ---------------- CREATE A NEW GROUP ----------------
router.post("/", 
  controller.createClubs
);
// // ---------------- JOIN A GROUP ----------------
router.post("/:groupId/members/:userId", 
  controller.joinClub
);


// // ---------------- DELETE GROUP ----------------
router.delete("/:id", 
  controller.deleteClub
);


export default router;