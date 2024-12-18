import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addToCart, getUserCart, removeFromCart } from "../controllers/cartController.js";

const cartRouter = Router();
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.delete("/remove/:id",authMiddleware,removeFromCart)
cartRouter.get("/getUserCart",authMiddleware,getUserCart)
export default cartRouter

