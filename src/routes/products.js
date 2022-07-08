import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProductsBySearch,
    getProductBySlug,
    getProducts,
    updateProduct,
    getProductsBySearchWithFilters,
} from "../controllers/Product.js";
import { isAuth } from "../middleware/Auth.js";
import { isProductOwner } from "../middleware/Product.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/title/:slug", getProductBySlug);
router.get("/q/filters/:query", getProductsBySearchWithFilters);
router.get("/q/:query", getProductsBySearch);
router.post("/", isAuth, createProduct);
router.put("/:id", isAuth, isProductOwner, updateProduct);
router.delete("/:id", isAuth, isProductOwner, deleteProduct);

export default router;
