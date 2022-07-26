import { Router } from "express"
import { LikeController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { LikeMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", LikeController.getAll)
router.post(
    "/",
    AuthMiddleware.isAuth,
    LikeMiddleware.isNotExist,
    LikeController.create
)

router.get("/:id", LikeMiddleware.isIdValid, LikeController.getById)
router.put(
    "/:id",
    LikeMiddleware.isIdValid,
    AuthMiddleware.isAuth,
    LikeController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    LikeMiddleware.isIdValid,
    LikeMiddleware.isExist,
    LikeMiddleware.isOwner,
    LikeController.remove
)

export default router
