import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  image: {
    type: String,
    default:""
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  ratings:[
    {
      star:{
        type:String
      },
      comment:{
        type:String
      },
      postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
      }
    }
  ] 
}, {
  timestamps: true
});
const ProductModel= mongoose.model('product', productSchema);
export default ProductModel
