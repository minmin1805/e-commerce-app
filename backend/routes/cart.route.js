import express from "express";
import { getAllProducts, addToCart, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllProducts);
router.post("/", protectRoute ,addToCart);
router.delete("/:id", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;