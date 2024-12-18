import express from "express"
import { addProduct,deleteProduct,getAllProduct,getSingleProduct, ratings, updateProduct} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
const productRoute=express.Router();
productRoute.post("/addProduct",authMiddleware,addProduct);
productRoute.get("/getAllProduct",authMiddleware,getAllProduct);
productRoute.get("/getSingleProduct/:id",authMiddleware,getSingleProduct);
productRoute.patch("/updateProduct/:id",authMiddleware,updateProduct);
productRoute.delete("/deleteProduct/:id",authMiddleware,deleteProduct);
productRoute.post("/rating",authMiddleware,ratings);
export default productRoute