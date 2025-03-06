import cloudinary from "../lib/cloudinary.js";
import Msg from "../models/msg.model.js";
import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id : {$ne : loggedInUser}}).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in msg controller side bar"+ error.message);
        res.status(500).json({message : "Internal server error"})
    }
}
export const getMsg = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Msg.find({
            $or : [
                {senderId : myId, receiverId : userToChatId},
                {senderId : userToChatId, receiverId : myId}   
            ]
        })

        return res.status(200).json(messages)
    } catch (error) {
        console.error("Error in msg controller get fn"+ error.message);
        res.status(500).json({message : "Internal server error"})
    }
}

export const sendMsg = async (req, res) => {
    try {
        const {image , text} = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl

        if(image){

            //upload bases64 image to cloudinary
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url
        }

        const newMsg = new Msg({
            senderId,
            receiverId,
            text,
            image : imageUrl
        })
        
        // todo : realtime functionality goes here -- using socket.io
        await newMsg.save();
        res.status(201).json(newMsg)

    } catch (error) {
        console.error("Error in msg controller send fn "+ error.message);
        res.status(500).json({message : "Internal server error"})
    }
}