import { Router } from "express"
import { UserController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", UserController.getUsers)
router.get("/:id", UserController.getUserById)
router.get("/username/:username", UserController.getUserByUsername)
router.post(
    "/",
    AuthMiddleware.isAuth,
    AuthMiddleware.isAdmin,
    AuthMiddleware.isEmailExist,
    AuthMiddleware.isUsernameTaken,
    UserController.create
)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isUsernameTaken,
    AuthMiddleware.isUserAuth,
    UserController.update
)
router.put(
    "/email/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isEmailExist,
    AuthMiddleware.isUserAuth,
    UserController.updateEmail
)
router.put(
    "/password/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isUserAuth,
    UserController.updatePassword
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isUserAuth,
    UserController.remove
)

export default router
