import { Router } from "express"
import { FavoriteController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { FavoriteMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", FavoriteController.getAll)
router.get("/:id", FavoriteController.getById)
router.post("/", AuthMiddleware.isAuth, FavoriteController.create)
router.put("/", AuthMiddleware.isAuth, FavoriteController.update)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    FavoriteMiddleware.isOwner,
    FavoriteController.remove
)

export default router
