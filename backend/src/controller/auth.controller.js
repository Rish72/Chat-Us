import { generateJWToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {

    const {fullName, email, password} = req.body;
    
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message : "Cannot be left empty"})
        }
        if(password.length < 12){
            return res.status(400).json({mssage: "Password must be of 12 characters"})
        }

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "USER ALREADY EXISTS IN DATABASE"})
        
        const hash = bcrypt.hashSync(password, 10);

        const newUser = new User({
            fullName, 
            email,
            password : hash,
            profilePic : ""
        })

        if(newUser){
            // generate JWT 
            generateJWToken(newUser._id, res)
            await newUser.save()

            return res.status(201).json({
                _id : newUser._id,
                fullName,
                email,
                profilePic : newUser.profilePic
            })
            
        }else{
            return res.status(400).json({message : "User not created internal error INVALID DATA ENTERED"})
        }
    } catch (error) {
        console.log("ERROR IS IN THE SIGN UP CONTROLLER ; ",error)
        return res.status(500).json({message : "server error"})
    }
}
export const login = async (req, res) => {
    const {email , password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message : "INVALID credentials"})
        }
        
        const isCorrect = await bcrypt.compare(password , user.password)
        if(!isCorrect){
            return res.status(404).json({message : "INVALID credentials"})
        }
       
        generateJWToken(user._id, res);

        return res.status(200).json({
            _id : user._id,
            fullName: user.fullName, 
            email : user.email,
            profilePic : user.profilePic,
            message : "User logged In"
        })

    } catch (error) {
        console.log("ERROR IN LOGIN CONTROLLER "+error);
        return res.status(500).json({message : "SERVER INVALID"})
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({message : "LOGGED OUT"})
    } catch (error) {
        console.log("ERROR IN LOGOUT CONTROLLER "+error);
        return res.status(500).json({message : "SERVER INVALID"})
    }
}
export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id
        if(!profilePic){
            return res.status(400).json({message : "PROFILE PIC IS REQUIRED"})
        }
        const uploadRes = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic : uploadRes.secure_url}, {new : true})

        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log("ERROR IN UPDATE PROFILE ", error);
        return res.status(500).json({message : "SERVER ERROR"})
    }
}
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (e) {
        console.log("Error in check auth", e);
        return res.status(500).json({message : "SERVER ERROR"})
    }
}