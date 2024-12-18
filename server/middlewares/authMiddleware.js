import jwt from "jsonwebtoken";
import "dotenv/config"
import user from "../models/user.js";
export async function authMiddleware(req,res,next){
    try{
      const {auth_token}=req.cookies;
      if(!auth_token) return res.json({
        message:"please login"
      })
      const decodeToken=jwt.verify(auth_token,process.env.SECRET);
      const loggedIn=await user.findById(decodeToken.userId);
      if(!loggedIn) return res.json({
        message:"please login"
      })
      //console.log(loggedIn)
      req.user=loggedIn;
      next();
    }
    catch(err){
        console.log(err)
    }
}