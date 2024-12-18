import Coupon from "../models/coupon.js";
import mongoose from "mongoose";
export async function addCoupon(req,res){
    try{
       const {code,discount,expirationDate,maxUsage, usedCount, applicableProducts,isActive}=req.body;
       const createdBy=req.user._id
       const checkCode=await Coupon.findOne({code});
       if(checkCode) return res.json({
        message:"Code already present"
       })
       const coupon=await new Coupon({code,discount,expirationDate,maxUsage, usedCount, applicableProducts,isActive,createdBy}).save()
       res.json({
        coupon
       })
    }
    catch(err){
        console.log(err)
    }
}
export async function getAllCoupons(req, res){
    try {
      const coupons = await Coupon.find();
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve coupons', error });
    }
  };
 export async function getSingleCoupon(req, res){
    try {
      const {id}=req.params
      const coupon = await Coupon.findById(id);
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve coupon', error });
    }
  };
export async function updateCoupon(req, res){
    try {
      const {id}=req.params
      const {discount,isActive,expirationDate}=req.body
      const coupon = await Coupon.findByIdAndUpdate(id,{discount,isActive,expirationDate},{ new: true });
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.status(200).json({ message: 'Coupon updated successfully', coupon });
    } catch (error) {
      res.status(400).json({ message: 'Failed to update coupon', error });
    }
  };
export async function deleteCoupon(req, res){
    try {
      const {id}=req.params
      const coupon = await Coupon.findByIdAndDelete(id);
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete coupon', error });
    }
  };
  
  