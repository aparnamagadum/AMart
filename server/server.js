import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose"
import "dotenv/config"
import router from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import productRoute from "./routes/ProductRoute.js";
import couponRoute from "./routes/couponRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
const app=express();
const port=process.env.PORT
const uri=process.env.URI
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
mongoose.connect(uri)
        .then(()=> app.listen(port ,()=>console.log(`server running on port ${port}`)))
        .catch((err)=>console.log(err))
app.use("/api/user",router);
app.use("/api/admin/product",productRoute)
app.use("/api/admin/coupon",couponRoute)
app.use("/api/user/cart",cartRouter)
app.use("/api/user/order",orderRouter)