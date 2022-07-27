import { Router } from "express"
import { CategoryController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { CategoryMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", CategoryController.getAll)
router.post(
    "/",
    AuthMiddleware.isAuth,
    AuthMiddleware.isAdmin,
    CategoryController.create
)

router.get("/type/:type", CategoryController.getAllByType)
router.get(
    "/name/:name",
    CategoryMiddleware.isNameExist,
    CategoryController.getByName
)

router.get("/:id", CategoryMiddleware.isExist, CategoryController.getById)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isAdmin,
    CategoryMiddleware.isExist,
    CategoryController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isAdmin,
    CategoryController.remove
)

export default router
