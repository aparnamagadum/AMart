import jwt from "jsonwebtoken"
import "dotenv/config"
export function generateToken(user){
    return (
        jwt.sign({
            userId:user._id,
            userEmail:user.email,
            isvarified:true
        },
        process.env.SECRET,
        {
            expiresIn:"1hr"
        }
    )
    )
}