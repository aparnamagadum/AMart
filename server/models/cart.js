import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        price: Number,
        count: Number,
        //attributes contain color size etc
        attributes: [
          {
            type: String,
            value: String,
          },
        ],
      },
    ],
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    cartTotal: Number,
  },
  { timestamps: true }
);
const cartModel = model("cart", cartSchema);

export default cartModel;