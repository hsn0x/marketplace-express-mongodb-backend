import { Router } from "express"
import { AuthController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"

const router = Router()

router.post("/login", AuthMiddleware.isGuest, AuthController.login)
router.get("/me", AuthMiddleware.isAuth, AuthController.profile)

router.post(
    "/register",
    AuthMiddleware.isGuest,
    AuthMiddleware.isEmailExist,
    AuthMiddleware.isUsernameTaken,
    AuthController.register
)

router.get(
    "/login/failure",
    AuthMiddleware.isGuest,
    AuthController.loginFailure
)
router.get("/login/success", AuthMiddleware.isAuth, AuthController.loginSuccess)

router.get("/logout", AuthController.logout, AuthController.logoutSession)

export default router
