import { Router } from "express"
import { ReviewController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { ReviewMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", ReviewController.getAll)
router.get("/:id", ReviewController.getById)
router.get("/q/:query", ReviewController.getAllBySearch)
router.get("/name/:slug", ReviewController.getByName)
router.post("/", AuthMiddleware.isAuth, ReviewController.createReview)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    ReviewMiddleware.isOwner,
    ReviewController.updateReview
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    ReviewMiddleware.isOwner,
    ReviewController.deleteReview
)

export default router
