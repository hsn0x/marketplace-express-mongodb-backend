import { Router } from "express"
import { LikeController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { LikeMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", LikeController.getAll)
router.get("/:id", LikeController.getById)
router.post("/", AuthMiddleware.isAuth, LikeController.create)
router.put("/", AuthMiddleware.isAuth, LikeController.update)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    LikeMiddleware.isOwner,
    LikeController.remove
)

export default router
