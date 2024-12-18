import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createOrder,getAllOrder,getUserOrder } from "../controllers/orderController.js";
const orderRouter = Router();
orderRouter.post("/createOrder", authMiddleware, createOrder);
orderRouter.get("/getUserOrder",authMiddleware,getUserOrder);
orderRouter.get("/getAllOrder",authMiddleware,getAllOrder)
export default orderRouter