import { Router } from "express"
import { MarketController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { MarketMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/:id", MarketMiddleware.isIdValid, MarketController.getById)
router.get("/name/:slug", MarketController.getBySlug)

router.get("/", MarketController.getAll)
router.get("/q/:query", MarketController.getAllBySearch)

router.post(
    "/",
    AuthMiddleware.isAuth,
    MarketMiddleware.isUsernameTaken,
    MarketController.create
)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    MarketMiddleware.isUsernameTaken,
    MarketMiddleware.isIdValid,
    MarketMiddleware.isOwner,
    MarketController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    MarketMiddleware.isIdValid,
    MarketMiddleware.isOwner,
    MarketController.remove
)

export default router
