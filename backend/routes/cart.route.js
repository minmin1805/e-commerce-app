import express from "express";
import { getAllProducts, addToCard, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllProducts);
router.post("/", protectRoute ,addToCard);
router.delete("/:id", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;