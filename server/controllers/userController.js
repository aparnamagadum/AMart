import user from "../models/user.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";
import { generateUrl } from "../utils/generateUrl.js";
import nodemailer from "nodemailer"
import "dotenv/config"
import jwt from "jsonwebtoken"
export async function register(req,res){
    try{
        let {firstName,lastName,email,password,role}=req.body;
        //const {profile}=req.file
        const profile=await generateUrl(req)
        if(!firstName||!lastName|| !email||!password||!role) return res.json({
            message:"all the field required"
        })
        const data=await user.findOne({email});
        if(data) return res.json({
            message:"already have a account with this email"
        })
        const hashedPassword=await bcrypt.hash(password,10);
        password=hashedPassword
        await new user({profile,firstName,lastName,email,password,role}).save();
        res.json({
            message:"success"
        })
    }
    catch(err){
    console.log(err)
    }
}
export async function login(req,res){
    try{
      const {email,password,role}=req.body;
      const checkUser=await user.findOne({email});
      if(!checkUser) return res.json({
        message:"Invalid mail"
      }) 
      const check=await bcrypt.compare(password,checkUser.password)
      if(!check) return res.json({
        message:"Invalid password"
      }) 
      if(role===checkUser.role){
        const token=generateToken(checkUser);
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"lax",
            maxSize:3600000
        })
        .json({
            message:"success"
        })
      }
      
    }
    catch(err){
        console.log(err)
    }
}
export function logout(req,res){
    try{
       res.clearCookie("auth_token",{
        httpOnly:true,
        secure:true,
        sameSite:"lax"
       }
       )
       .json({
        message:"success"
       })
    }
    catch(err){
        console.log(err)
    }
}
export function isUserLoggedIn(req,res){
    res.json({
        user:req.user
    })
}
export async function forgotPassword(req,res){
    try{
        const {email}=req.body;
        const checkUser=await user.findOne({email})
        if(!checkUser) return res.json({message:"user not found with this email"})
        const token=generateToken(checkUser);
        console.log(token)
        const Transpoter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })
       // console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS);
        let message={
            from:process.env.EMAIL_USER,
            to:email,
            subject:"Reset Password",
            text:`https://localhost:3030/api/user/resetPassword/${checkUser._id}/${token}`
        }
        //console.log(message);
        await Transpoter.sendMail(message)
        res.json({
            message:"email sent"
        })
    }
    catch(err){
        console.log(err)
    }
}
export async function resetPassword(req,res){
    try{
        const {id,token}=req.params;
        let {password}=req.body;
        const decodeToken=jwt.verify(token,process.env.SECRET);
        if(!decodeToken) return res.json({
            message:"token not found"
        })
        const hashedPassword=await bcrypt.hash(password,10)
        password=hashedPassword;
        await user.findByIdAndUpdate(id,{password},{new:true});
        res.json({
            message:"password reset"
        })
    }
    catch(err){
        console.log(err)
    }
}
export async function addToWishlist(req, res) {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        // Check if the product is already in the wishlist
        const isAlreadyAdded = req.user.wishlist.some(id => id.equals(productId));
        let updatedUser;

        if (!isAlreadyAdded) {
            // Add product to wishlist
            updatedUser = await user.findByIdAndUpdate(
                userId,
                { $push: { wishlist: productId } },
                { new: true }
            );
        } else {
            // Remove product from wishlist
            updatedUser = await user.findByIdAndUpdate(
                userId,
                { $pull: { wishlist: productId } },
                { new: true }
            );
        }

        res.status(200).json({ success: true, wishlist: updatedUser.wishlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export async function getUserWishlist(req, res) {
    try {
      const userId = req.user._id;
  
      // Find the user and populate the wishlist with product details
      const userWithWishlist = await user.findById(userId);
      if (!userWithWishlist) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, wishlist: userWithWishlist.wishlist });
    } catch (err) {
      console.error("Error retrieving wishlist:", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
  
