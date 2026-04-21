import { Router } from "express"
import clubsRouter from "./clubsRouter.js"
import libraryRouter from "./libraryRouter.js"
import { authMiddleware } from "../middlewares/auth.js"
const router = Router()


router.use("/clubs", authMiddleware, clubsRouter)
router.use("/library", authMiddleware, libraryRouter)
export default router;