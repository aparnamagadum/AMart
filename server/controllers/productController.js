import ProductModel from "../models/product.js";
import { generateUrl } from "../utils/generateUrl.js";
export async function addProduct(req,res){
    try{
     const {name,brand,category,description,price,inStock,inventory}=req.body
     const addedBy=req.user._id
     const image= await generateUrl(req)
     if(!name || !brand ||!category || !description || !price || !inStock || !inventory) {
        return res.json({
            message:"All field required"
        })
     }
     const result=new ProductModel({image,name,brand,category,description,price,inStock,inventory,addedBy})
     await result.save();
     res.json({
        message:"success"
     })
    }
    catch(err){
        console.log(err)
    }
}
export async function getAllProduct(req,res){
    try{
      const query={};
      const sortArg={};
      const {category,brand,price,name,sort,sortby}=req.query;
      if(category){
        query.category=category
      }
      if(brand){
        query.brand=brand
      }
      if(name){
        query.name=name;
      }
      if(price){
        query.price=price;
      }
      if(sort && sortby){
        sortData=sort==='asc'? 1 :-1;
        sortfield=sortby;
        sortArg[sortfield]=sortData
      }
      const products=await ProductModel.find(query).sort(sortArg);
      res.json({
        products
      })
    }
    catch(err){
        console.log(err);
    }
}
export async function getSingleProduct(req,res){
    try{
     const {id}=req.params;
     const product=await ProductModel.findById(id);
     res.json({
        product
     }
    )
    }
    catch(err){
        console.log(err)
    }
}
export async function updateProduct(req,res){
   try{
    const {id}=req.params;
    const {price,inStock,inventory}=req.body;
    const product=await ProductModel.findByIdAndUpdate(
        id ,
        {price , inStock,inventory},
        {new:true}
    )
    res.json({
        message:"product updated",
        product
    })
   }
   catch(err){
    console.log(err)
   }
}
export async function deleteProduct(req,res){
    try{
     const {id}=req.params
     const data=await ProductModel.findByIdAndDelete(id);
     res.json({
        message:"product deleted",
        data
     })
    }
    catch(err){
        console.log(err);
    }
}
export async function ratings(req,res){
  try{
     const {star,comment,productId}=req.body;
    const userId=req.user._id;
    const product=await ProductModel.findById(productId);
    let updatedProduct;
    const alreadyRated = product.ratings.find(rating => rating.postedBy.equals(userId));
    if(!alreadyRated){
      updatedProduct=await ProductModel.findByIdAndUpdate(productId,{
        $push:{
          ratings:{
            star:star,
            comment:comment,
            postedBy:userId
          }
        }
      },{
        new:true
      })
    }
    else {
      updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: productId, "ratings.postedBy": userId },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment
          }
        },
        { new: true }
      );
    }
    res.json({
      updatedProduct
    })
  }
  catch(err){
    console.log(err)
  }
}