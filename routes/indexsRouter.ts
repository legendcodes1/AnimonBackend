import { Router } from "express"
import groupRouter from "./groups"
import LibraryRouter from "./library"
const router = Router()


router.use(LibraryRouter)
router.use(groupRouter)