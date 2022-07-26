import { Router } from "express"
import { ProductController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { ProductMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/:id", ProductMiddleware.isIdValid, ProductController.getById)
router.get("/title/:slug", ProductController.getBySlug)

router.get("/", ProductController.getAll)
router.get("/q/filters/:query", ProductController.getAllByFilters)
router.get("/q/:query", ProductController.getAllBySearch)

router.post("/", AuthMiddleware.isAuth, ProductController.create)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    ProductMiddleware.isIdValid,
    ProductMiddleware.isOwner,
    ProductController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    ProductMiddleware.isIdValid,
    ProductMiddleware.isOwner,
    ProductController.remove
)

export default router
