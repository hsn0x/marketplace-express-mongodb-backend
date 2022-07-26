import { Router } from "express"
import { VoteController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { VoteMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", VoteController.getAll)
router.post(
    "/",
    AuthMiddleware.isAuth,
    VoteMiddleware.isNotExist,
    VoteController.create
)

router.get("/:id", VoteMiddleware.isIdValid, VoteController.getById)
router.put(
    "/:id",
    VoteMiddleware.isIdValid,
    AuthMiddleware.isAuth,
    VoteController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    VoteMiddleware.isIdValid,
    VoteMiddleware.isExist,
    VoteMiddleware.isOwner,
    VoteController.remove
)

export default router
