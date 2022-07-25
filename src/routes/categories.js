import { Router } from "express"
import { CategoryController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { CategoryMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", CategoryController.getCategories)
router.get("/type/:type", CategoryController.getCategoriesByType)
router.get(
    "/name/:name",
    CategoryMiddleware.isNameExist,
    CategoryController.getCategoryByName
)
router.get(
    "/:id",
    CategoryMiddleware.isExist,
    CategoryController.getCategoryById
)
router.post(
    "/",
    AuthMiddleware.isAuth,
    AuthMiddleware.isAdmin,
    CategoryController.create
)
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
