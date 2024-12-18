import cartModel from "../models/cart.js";
import ProductModel from "../models/product.js";
import user from "../models/user.js";
import mongoose from "mongoose";

//addToCart
export async function addToCart(req, res) {
  const { cart } = req.body; // Assume cart is an array of products with `product` and `count`
  const userID = req.user._id;

  try {
    // Find the user's cart
    const userCart = await cartModel.findOne({ orderBy: userID });

    if (!userCart) {
      // If no existing cart, create a new one
      let products = [];

      for (let i = 0; i < cart.length; i++) {
        let obj = {};
        obj.product = cart[i].product;
        obj.count = cart[i].count;

        // Fetch price
        let fetchPrice = await ProductModel.findById(cart[i].product).select("price").exec();
        obj.price = fetchPrice.price;
        products.push(obj);
      }

      // Calculate the total price
      let totalPrice = products.reduce((acc, curr) => acc + curr.price * curr.count, 0);

      // Create a new cart
      let newUserCart = new cartModel({
        cart: products,
        cartTotal: totalPrice,
        orderBy: userID,
      });

      // Save the new cart
      await newUserCart.save();

      return res.json(newUserCart);
    } else {
      // If a cart already exists, update it
      for (let i = 0; i < cart.length; i++) {
        const existingProduct = userCart.cart.find((item) =>
          item.product.equals(cart[i].product)
        );

        if (existingProduct) {
          // Update count for an existing product
          existingProduct.count += cart[i].count;
        } else {
          // Add a new product to the cart
          let obj = {};
          obj.product = cart[i].product;
          obj.count = cart[i].count;

          // Fetch price
          let fetchPrice = await ProductModel.findById(cart[i].product).select("price").exec();
          obj.price = fetchPrice.price;

          userCart.cart.push(obj);
        }
      }

      // Recalculate the total price
      userCart.cartTotal = userCart.cart.reduce(
        (acc, curr) => acc + curr.price * curr.count,
        0
      );

      // Save the updated cart
      await userCart.save();

      return res.json(userCart);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


//removeCart
export async function removeFromCart(req, res) {
  const userID = req.user._id;
  const { id } = req.params;

  try {
    // Find the user's cart
    const userCart = await cartModel.findOne({ orderBy: userID });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }
    //console.log("Current cart items:", userCart.cart);
    // Filter out the product
    const updatedCartItems = userCart.cart.filter((item) => {
      if (!item.product) {
        return true;  
      }
      return item.product.toString() !== id.toString();
    });
    if (updatedCartItems.length === userCart.cart.length) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    // Recalculate the cart total
    let updatedTotalPrice = 0;
    updatedCartItems.forEach((item) => {
      if (item.price && item.count) {
        updatedTotalPrice += item.price * item.count;
      }
    });

    // Update the cart with the new items and total price
    userCart.cart = updatedCartItems;
    userCart.cartTotal = updatedTotalPrice;
    //console.log("Updated cart items:", updatedCartItems);
    //console.log("Updated cart total:", updatedTotalPrice);
    // Save to db
    await userCart.save();

    res.json({
      message: "Product removed from cart",
      cart: userCart,
    });
  } catch (err) {
    console.error("Error details:", err);  // Log the error details
    res.status(500).json({ error: "An error occurred while removing product from cart" });
  }
}


//getUserCart
export async function getUserCart(req, res) {
  try {
    const userId = req.user._id;
    //console.log(userId)
    const cart = await cartModel.findOne({ orderBy: userId }); // Query using `orderBy` field

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json({ cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while retrieving the cart" });
  }
}
