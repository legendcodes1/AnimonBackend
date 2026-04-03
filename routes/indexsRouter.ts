import { Router } from "express"
import clubsRouter from "./clubsRouter.js"
import libraryRouter from "./libraryRouter.js"
const router = Router()


router.use("/clubs", clubsRouter)
router.use("/library", libraryRouter)
export default router;