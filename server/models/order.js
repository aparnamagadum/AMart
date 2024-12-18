import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",  
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "cart", 
      required: true,
    },
    orderTotal: { type: Number, required: true },
    shippingAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "COD"],  // COD for "Cash on Delivery"
      required: true,
    },
    orderDate: { type: Date, default: Date.now },  // Date when the order was placed
  },
  { timestamps: true }
);

const OrderModel = model("order", orderSchema);

export default OrderModel;
