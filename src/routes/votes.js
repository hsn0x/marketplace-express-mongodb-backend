import { Router } from "express"
import { VoteController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { VoteMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", VoteController.getAll)
router.get("/:id", VoteController.getById)
router.post("/", AuthMiddleware.isAuth, VoteController.create)
router.put("/", AuthMiddleware.isAuth, VoteController.update)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    VoteMiddleware.isOwner,
    VoteController.remove
)

export default router
