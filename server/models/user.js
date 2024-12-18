import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  profile: {
    type: String,
    default: '',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
  },
  wishlist:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: "product"
    }
  ]
}, { timestamps: true });
const user=mongoose.model("user",userSchema);
export default user
