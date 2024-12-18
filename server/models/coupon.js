import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discount: {
    type: Number, // in percentage or fixed amount, adjust based on your need
    required: true,
    min: 0
  },
  expirationDate: {
    type: Date,
    required: true
  },
  maxUsage: {
    type: Number, // max number of times the coupon can be used
    default: 1
  },
  usedCount: {
    type: Number, // tracks how many times it has been used
    default: 0
  },
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
},{timestamps:true});
const Coupon = mongoose.model('coupon', couponSchema);
export default Coupon
