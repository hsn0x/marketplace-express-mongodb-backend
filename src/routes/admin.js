import { Router } from "express"
import { DashboardController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/dashboard", DashboardController.getDashboard)

export default router
