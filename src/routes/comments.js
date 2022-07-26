import { Router } from "express"
import { AuthMiddleware } from "../middlewares/index.js"
import { CommentController } from "../controllers/index.js"
import { CommentMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", CommentController.getAll)
router.post("/", AuthMiddleware.isAuth, CommentController.create)

router.get("/q/:query", CommentController.getAllBySearch)
router.get("/name/:slug", CommentController.getBySlug)

router.get("/:id", CommentMiddleware.isIdValid, CommentController.getById)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    CommentMiddleware.isIdValid,
    CommentMiddleware.isOwner,
    CommentController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    CommentMiddleware.isIdValid,
    CommentMiddleware.isOwner,
    CommentController.remove
)

export default router
