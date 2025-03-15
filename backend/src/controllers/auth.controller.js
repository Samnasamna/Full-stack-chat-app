import e from "express";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";
import cloudinary from "../config/cloudinary.js";

// Register user data
export const signUp = async (req, res)=>{
    
    try{
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({
                error:true,
                message:"all fields are required!"})
        }
       

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                error:true,
                message:"user already exist"
            })
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new User({
                ...req.body,
                password:hashedPassword
            })

            if(newUser){
                //generate token

                generateToken(newUser._id, res)
                await newUser.save()
                return res.status(201).json(newUser)
            }else{
                return res.status(400).json({
                    error:true,
                    message:"invalid user data"
                })
            }
        }
    }catch(error){
        console.log("something went wrong", error);
        return res.status(500).json({
            error:true,
            message:"internal server error"
        })
    }
}

//login user
export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                error:true,
                message:"all fields are required!"})
        }

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))){
            generateToken(user._id,res)
            return res.status(201).json(user)
        }else{
            return res.status(400).json({
                error:true,
                message:"user not found!"
            })
        }
    }catch(error){
        console.log("something went wrong!", error)
        return res.status(500).json({
            error:true,
            message:"internal server error"
        })
    }
}

//log out user
export const logout = (req, res)=>{
    try{
        res.cookie("jwt-token","",{maxAge:0})
        return res.status(200).json({message:"logged out successfully!"})
    }catch(error){
        console.log("something went wrong!", error)
        return res.status(500).json({
            error:true,
            message:"internal server error"
        })
    }
}

//update user profile
export const updateProfile =async ( req, res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({
                error:true,
                message:"Profile pic is required!"})
        }

        const updatedResponse = await cloudinary.uploader.upload(profilePic);

       

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic: updatedResponse.secure_url},
            {new:true}
        )

        return res.status(200).json(updatedUser)
        
    }
    catch (error) {
        return res.status(500).json({
            error:true,
            message:"internal server error"
        })
    }
}

//get profile data
export const checkAuth = (req, res)=>{
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json({
            error:true,
            message:"internal server error"
        })
    }
}