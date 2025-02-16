import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(password.lenght < 12){
            return res.status(400).json({mssage: "Password must be of 12 characters"})
        }

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "USER ALREADY EXISTS IN DATABASE"})
        
        const hash = bcrypt.hashSync(password, 10);

        const newUser = new User({
            fullName, 
            email,
            passowrd : hash
        })

        if(newUser){
            // generate JWT 
            
        }else{
            res.status(400).json({message : "User not created internal error"})
        }
    } catch (error) {
        
    }
}
export const login = (req, res) => {
    res.send("SIGNED UP")
}
export const logout = (req, res) => {
    res.send("SIGNED UP")
}