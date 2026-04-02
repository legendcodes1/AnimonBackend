import { Router } from "express"
import clubsRouter from "./clubsRouter.js"
const router = Router()


router.use("/clubs", clubsRouter)

export default router;