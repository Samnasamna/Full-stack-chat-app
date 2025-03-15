import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next)=>{
    try {
        
        const token = req.cookies["jwt-token"]

        if(!token){
            return res.status(401).json({
                error:true,
                message:"Unauthorized access!"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            
        if(!decoded){
            return res.status(401).json({
                error:true,
                message:"Invalid Token!"
            })    
        }

        const user = await User.findById(decoded.userId).select("-password")        

        if(!user){
            return res.status(401).json({
                error:true,
                message:"User not available"
            })
        }

        req.user = user
        next();       
                
        
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message:"internal server error"
        })
    }
}