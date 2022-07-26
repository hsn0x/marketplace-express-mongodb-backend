import { Router } from "express"
import { FavoriteController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { FavoriteMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", FavoriteController.getAll)
router.post(
    "/",
    AuthMiddleware.isAuth,
    FavoriteMiddleware.isNotExist,
    FavoriteController.create
)

router.get("/:id", FavoriteMiddleware.isIdValid, FavoriteController.getById)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    FavoriteMiddleware.isIdValid,
    FavoriteController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    FavoriteMiddleware.isIdValid,
    FavoriteMiddleware.isExist,
    FavoriteMiddleware.isOwner,
    FavoriteController.remove
)

export default router
