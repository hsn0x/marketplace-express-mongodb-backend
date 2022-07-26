import { Router } from "express"
import { ReviewController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { ReviewMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", ReviewController.getAll)
router.get("/:id", ReviewController.getById)
router.get("/q/:query", ReviewController.getAllBySearch)
router.get("/name/:slug", ReviewController.getBySlug)
router.post("/", AuthMiddleware.isAuth, ReviewController.create)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    ReviewMiddleware.isOwner,
    ReviewController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    ReviewMiddleware.isOwner,
    ReviewController.remove
)

export default router
