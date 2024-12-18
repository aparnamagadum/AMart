import express from "express"
import { addCoupon,getAllCoupons,getSingleCoupon,updateCoupon,deleteCoupon } from "../controllers/couponController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const couponRoute=express.Router();
couponRoute.post("/addcoupon",authMiddleware,addCoupon);
couponRoute.get("/getAllcoupon",authMiddleware,getAllCoupons);
couponRoute.get("/getSinglecoupon/:id",authMiddleware,getSingleCoupon);
couponRoute.patch("/updatecoupon/:id",authMiddleware,updateCoupon);
couponRoute.delete("/deletecoupon/:id",authMiddleware,deleteCoupon);
export default couponRoute