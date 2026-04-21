import { Router } from "express"
import {clubsController} from "../controllers/clubsController"

const router = Router()
const controller = clubsController()

router.get("/", controller.getClubs);
router.get("/:id", controller.getClubById);
router.post("/", controller.createClubs);


router.post("/:id/members/:userId", controller.joinClub);
router.get("/:id/members/:userId", controller.checkClub);

router.delete("/:id", controller.deleteClub);

export default router;