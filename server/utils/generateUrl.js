import cloudinary from "cloudinary";
import "dotenv/config"
export async function generateUrl(req){
    try{
        cloudinary.config({ 
            cloud_name:process.env.cloudName, 
            api_key: process.env.cloudKey, 
            api_secret: process.env.cloudSecretKey
          });
        const result=await cloudinary.uploader.upload(req.file.path,{
            folder:"shop"
        })
        return result.secure_url;
    }
    catch(err){
        console.log(err);
    }
} 
