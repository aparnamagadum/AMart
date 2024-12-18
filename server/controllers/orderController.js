import OrderModel from "../models/order.js";
import cartModel from "../models/cart.js";

export async function createOrder(req, res) {
  const { cartId, shippingAddress, paymentMethod } = req.body;
  const userId = req.user._id;

  try {
    // Retrieve the cart details using cartId
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    //console.log(cart);
    // Ensure the cart belongs to the current user
    if (!cart.orderBy.equals(userId)) {
      return res.status(403).json({ error: "Unauthorized access to this cart" });
    }
    // Create a new order using the retrieved cart details
    const newOrder = new OrderModel({
      user: userId,
      cart: cartId,
      orderTotal: cart.cartTotal,  // Use the total from the cart
      shippingAddress,
      paymentMethod
    });

    // Save the new order to the database
    await newOrder.save();

    // Optionally, clear the cart after placing the order
    await cartModel.findByIdAndDelete(cartId);

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the order",
      details: error.message,
    });
  }
}


//getUserOrder
export async function getUserOrder(req,res){
  try{
     const userId=req.user._id
     const order=await OrderModel.findOne({user:userId})
     if (!order) {
      return res.status(404).json({ error: "Order not found for the user" });
    }
     res.json({order})
  }
  catch(err){
    console.log(err)
  }
}


//getAllOrder
export async function getAllOrder(req,res){
  try{
    const orders=await OrderModel.find();
    res.json({
      orders
    })
  }
  catch(err){
    console.log(err)
  }
}