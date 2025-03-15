import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId } from "../config/socket.js";
import { io } from "../config/socket.js";

// get all user except the sender .. {me}
export const getUserForSideBar = async (req, res)=> {
    try {
        const loggedInUserId = req.user._id;
        const filteredUserId = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        return res.status(200).json(filteredUserId)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        })
    }
}

//get the messages between 2 people
export const getMessages = async (req, res)=>{
    try {
        const {id:userToChatId} = req.params

        const senderId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:senderId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:senderId}
            ]
        })

        return res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        })
    }
}

//send messages 
export const sendMessage = async (req, res)=>{
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params
        const senderId = req.user._id

        let imageUrl;
        if(image){
            const updatedResponse = await cloudinary.uploader.upload(image);
            imageUrl = updatedResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        //socket func

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        return res.status(200).json(newMessage)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        })
    }
}