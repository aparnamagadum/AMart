import express from "express"
import { addToWishlist, forgotPassword, getUserWishlist, isUserLoggedIn, login, logout, register, resetPassword } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
const router=express.Router();
router.post("/register",upload.single("profile"),register)
router.post("/login",login);
router.post("/logout",logout)
router.get("/isLoggedIn",authMiddleware,isUserLoggedIn)
router.post("/wishlist",authMiddleware,addToWishlist)
router.post("/forgotPassword",forgotPassword)
router.post("/resetPassword/:id/:token",resetPassword)
router.get("/getUserWishlist",authMiddleware,getUserWishlist)
export default router